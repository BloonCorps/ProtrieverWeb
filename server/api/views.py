from django.http import JsonResponse
from datasets import load_dataset, load_from_disk

def get_data(request):
    # load the dataset from disk
    dataset = load_from_disk('9606')
    
    # Specify the columns to include
    columns_to_include = ['id', 'annotation', 'alias', 'seq_len', 't_sne']

    # Convert to list of dicts, only including specified columns
    data = [{col: row[col] for col in columns_to_include} for row in dataset]

    return JsonResponse(data, safe=False)

if __name__ == "__main__":
    dataset = load_from_disk('f:/Dropbox (MIT)/Desktop/ProtrieverWeb/server/9606/')
    print(dataset.column_names)