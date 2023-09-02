from django.http import JsonResponse
from datasets import load_dataset, load_from_disk
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from django.views.decorators.http import require_http_methods
from esm import pretrained
import torch
import faiss
from Protriever.src.databases.alias_to_index import retrieve_indices
from datasets import concatenate_datasets

from Protriever.models.search import *

def get_domain_motifs_list(request):
    """
    Input: None
    Output: List of names of motifs and domains within humans
    """
    data = load_from_disk('Protriever/src/data/processed/UniProtKB/domains/')
    domains = data['domain']['name']
    motifs = data['motif']['name']

    return JsonResponse({"domains": domains, "motifs": motifs})

def get_domain_indxs(request):
    """
    Input: name of a domain or motif.
    Output: indices of proteins with that name or motif.
    """
    # Get 'name' parameter from the request
    domain_name = request.GET.get('name', None)

    data = load_from_disk('Protriever/src/data/processed/UniProtKB/domains/')
    data = concatenate_datasets([data['motif'], data['domain']])
    
    if domain_name is None:
        return JsonResponse({"error": "No domain name provided."}, status=400)

    # Filter 'motif' dataset on the 'name' column
    filtered_dataset = data.filter(lambda x: x['name'] == domain_name)

    # If no rows matched the filter, return an error
    if len(filtered_dataset) == 0:
        return JsonResponse({"error": "No motif found with the provided name."}, status=404)

    # Get 'proteins' values for the filtered rows
    proteins = filtered_dataset['proteins'][0]  # assuming 'proteins' is a list

    indices = retrieve_indices(proteins)

    # Clean 'indices' to be integers and exclude null values
    indices = [int(idx) for idx in indices if idx is not None]

    return JsonResponse({"indices": indices, "proteins": proteins})

def get_data(request):
    dataset = cache.get('dataset')
    
    if dataset is None:
        raw_dataset = load_from_disk('Protriever/src/data/processed/HFAll/9606/')
        columns_to_include = ['id', 'annotation', 'alias', 'seq_len', 't_sne', 'protein_coding']
        dataset = [{col: row[col] for col in columns_to_include} for row in raw_dataset if row['protein_coding']]
        cache.set('dataset', dataset)

    return JsonResponse(dataset, safe=False)

def search_sequence(request):
    query = request.GET.get('input')
    if type(query) is str:
        query = [query]

    #model
    model = cache.get('model')
    batch_converter = cache.get('batch_converter')
    #data
    dataset = cache.get('dataset_whole')
    index = cache.get('faiss_index')

    if dataset is None:
        dataset = load_from_disk('Protriever/src/data/processed/HFAll/9606/')
        dataset = dataset.filter(lambda example: example['protein_coding'] == True)
        cache.set('dataset_whole', dataset)

    if model is None or batch_converter is None:
        model, alphabet = pretrained.esm2_t30_150M_UR50D()
        batch_converter = alphabet.get_batch_converter()
        device = torch.device("cuda:0")
        model.to(device)
        cache.set('model', model)
        cache.set('batch_converter', batch_converter)

    if index is None:
        index = faiss.IndexHNSWFlat(640, 512, faiss.METRIC_L2)
        dataset.add_faiss_index("embeddings", custom_index=index)
        cache.set('faiss_index', index)
        cache.set('dataset_whole', dataset)

    idx = retrieve_similar_sequences(query, dataset, return_num=200, 
                                     batch_converter=batch_converter, model=model)

    result = indices_to_info(idx, dataset, annotation_len=1000)

    return JsonResponse(result[0], safe=False)