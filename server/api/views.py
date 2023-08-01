from django.http import JsonResponse
from datasets import load_dataset, load_from_disk
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from django.views.decorators.http import require_http_methods
from esm import pretrained
import torch
import faiss
from Protriever.models.search import *

def get_domain_indxs(request):
    """
    Input: name of a domain or motif.
    Output: indicies of proteins with that name or motif.
    """
    # Get 'name' parameter from the request
    domain_name = request.GET.get('name', None)

    if domain_name is None:
        return JsonResponse({"error": "No domain name provided."}, status=400)

    indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    # Return the indices in the response
    return JsonResponse({"indices": indices})

def get_data(request):
    data = cache.get('data')
    
    if data is None:
        dataset = load_from_disk('9606') #server is run from the upper directory
        columns_to_include = ['id', 'annotation', 'alias', 'seq_len', 't_sne']
        data = [{col: row[col] for col in columns_to_include} for row in dataset]
        cache.set('data', data)

    return JsonResponse(data, safe=False)

def search_sequence(request):
    query = request.GET.get('input')
    if type(query) is str:
        query = [query]

    model = cache.get('model')
    batch_converter = cache.get('batch_converter')

    dataset = cache.get('dataset_whole')
    index = cache.get('faiss_index')

    if dataset is None:
        dataset = load_from_disk('9606') #server is run from the upper directory
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

    result = indices_to_info(idx, dataset, annotation_len=400)

    return JsonResponse(result[0], safe=False)

class SearchAPI(APIView):
    def get(self, request):
        name = request.GET.get('name', None)
        if name is not None:
            result = do_computation(name)
            return Response(result)
        else:
            return Response("No name parameter provided", status=400)