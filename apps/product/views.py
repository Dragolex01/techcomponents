from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from apps.product.models import Product
from apps.product.serializers import ProductSerializer

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format = None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status = status.HTTP_404_NOT_FOUND)
        
        if Product.objects.filter(id = product_id).exists():
            product = Product.objects.get(id = product_id)

            product = ProductSerializer(product)

            return Response({'product': product.data}, status = status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Product with this ID does not exist'},
                status = status.HTTP_404_NOT_FOUND)



class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        
        products = Product.objects.all()
        
        products = ProductSerializer(products, many=True)

        if products:
            return Response({'products': products.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND)




# class ListProductsView(APIView):
#     permission_classes = (permissions.AllowAny, )

#     def get(self, request, format=None):
#         sortBy = request.query_params.get('sortBy')

#         if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'name'):
#             sortBy = 'date_created'
        
#         order = request.query_params.get('order')
#         limit = request.query_params.get('limit')

#         if not limit:
#             limit = 6
        
#         try:
#             limit = int(limit)
#         except:
#             return Response(
#                 {'error': 'Limit must be an integer'},
#                 status=status.HTTP_404_NOT_FOUND)
        
#         if limit <= 0:
#             limit = 6
        
#         if order == 'desc':
#             sortBy = '-' + sortBy
#             products = Product.objects.order_by(sortBy).all()[:int(limit)]
#         elif order == 'asc':
#             products = Product.objects.order_by(sortBy).all()[:int(limit)]
#         else:
#             products = Product.objects.order_by(sortBy).all()

#         products = Product.objects.all()
        
#         products = ProductSerializer(products, many=True)

#         if products:
#             return Response({'products': products.data}, status=status.HTTP_200_OK)
#         else:
#             return Response(
#                 {'error': 'No products to list'},
#                 status=status.HTTP_404_NOT_FOUND)