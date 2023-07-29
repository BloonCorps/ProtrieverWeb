from django.http import JsonResponse
from datasets import load_dataset, load_from_disk
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache

def get_data(request):
    data = cache.get('dataset')
    
    if data is None:
        dataset = load_from_disk('9606')
        columns_to_include = ['id', 'annotation', 'alias', 'seq_len', 't_sne']
        data = [{col: row[col] for col in columns_to_include} for row in dataset]
        cache.set('dataset', data)

    return JsonResponse(data, safe=False)

class SearchAPI(APIView):
    def get(self, request):
        name = request.GET.get('name', None)
        if name is not None:
            result = do_computation(name)
            return Response(result)
        else:
            return Response("No name parameter provided", status=400)

if __name__ == "__main__":
    dataset = load_from_disk('f:/Dropbox (MIT)/Desktop/ProtrieverWeb/server/9606/')
    print(dataset.column_names)