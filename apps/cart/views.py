from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Cart, CartItem

from apps.product.models import Product
from apps.product.serializers import ProductSerializer


# Obtener productos en carrito
class GetItemsView(APIView):
    def get(self, request, format = None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user = user)
            cart_items = CartItem.objects.order_by('product').filter(cart = cart)

            result = []

            if CartItem.objects.filter(cart = cart).exists():
                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['count'] = cart_item.count
                    product = Product.objects.get(id = cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

            return Response(
                {'cart': result},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al obtener los productos del carrito'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# Añadir producto a carrito
class AddItemView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'ID del producto debe ser un entero'},
                status = status.HTTP_404_NOT_FOUND)

        try:
            count = int(data['count'])
        except:
            return Response(
                {'error': 'Cantidad del producto debe ser un entero'},
                status = status.HTTP_404_NOT_FOUND)

        try:
            if not Product.objects.filter(id = product_id).exists():
                return Response(
                    {'error': 'Este producto no existe'},
                    status = status.HTTP_404_NOT_FOUND)
            
            product = Product.objects.get(id = product_id)
            cart = Cart.objects.get(user = user)

            if CartItem.objects.filter(cart = cart, product = product).exists():
                total_count = CartItem.objects.filter(product = product, cart = cart)[0].count + count

                if total_count <= product.quantity:
                    CartItem.objects.filter(product = product, cart = cart).update(count = total_count)
                    cart_items = CartItem.objects.order_by('product').filter(cart = cart)

                    result = []

                    for cart_item in cart_items:
                        item = {}

                        item['id'] = cart_item.id
                        item['count'] = cart_item.count

                        product = Product.objects.get(id = cart_item.product.id)
                        product = ProductSerializer(product)

                        item['product'] = product.data

                        result.append(item)

                    return Response(
                            {'cart': result},
                            status = status.HTTP_201_CREATED)
                else:
                    return Response(
                        {'error': 'No hay stock de este producto'},
                        status = status.HTTP_422_UNPROCESSABLE_ENTITY
                    )
            else:
                if int(product.quantity) > 0:
                    CartItem.objects.create(
                        product = product,
                        cart = cart,
                        count = count
                    )

                    if CartItem.objects.filter(cart = cart, product = product).exists():
                        total_items = int(cart.total_items) + 1

                        Cart.objects.filter(user = user).update(total_items = total_items)
                    
                        cart_items = CartItem.objects.order_by('product').filter(cart = cart)

                        result = []

                        for cart_item in cart_items:
                            item = {}

                            item['id'] = cart_item.id
                            item['count'] = cart_item.count
                            
                            product = Product.objects.get(id = cart_item.product.id)
                            product = ProductSerializer(product)

                            item['product'] = product.data

                            result.append(item)

                        return Response(
                            {'cart': result},
                            status = status.HTTP_201_CREATED)
                    else:
                        return Response(
                            {'error': 'Sin stock de este producto'},
                            status = status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(
                {'error': 'Algo ha salido mal al añadir el producto al carrito'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR)


# Obtener coste total carrito
class GetTotalView(APIView):
    def get(self, request, format = None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user = user)
            cart_items = CartItem.objects.filter(cart = cart)

            total_cost = 0.0

            if cart_items.exists():
                for cart_item in cart_items:
                    total_cost += (float(cart_item.product.price) * float(cart_item.count))

                total_cost = round(total_cost, 2)
            return Response(
                {'total_cost': total_cost},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al obtener el coste total'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# Obtener total items en carrito
class GetItemTotalView(APIView):
    def get(self, request, format = None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user = user)
            total_items = cart.total_items

            return Response(
                {'total_items': total_items},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al obtener el numero total de items'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Actualiza producto en carrito
class UpdateItemView(APIView):
    def put(self, request, format = None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'ID del producto debe ser un entero'},
                status = status.HTTP_404_NOT_FOUND
            )
        
        try:
            new_count = int(data['count'])
        except:
            return Response(
                {'error': 'Cantidad de producto debe ser un entero'},
                status = status.HTTP_404_NOT_FOUND
            )

        try:
            if not Product.objects.filter(id = product_id).exists():
                return Response(
                    {'error': 'Este producto no existe'},
                    status = status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id = product_id)
            cart = Cart.objects.get(user = user)

            if not CartItem.objects.filter(cart = cart, product = product).exists():
                return Response(
                    {'error': 'Este producto no esta en tu carrito'},
                    status = status.HTTP_404_NOT_FOUND
                )
            
            quantity = product.quantity

            if new_count <= quantity:
                CartItem.objects.filter(product = product, cart = cart).update(count = new_count)

                cart_items = CartItem.objects.order_by('product').filter(cart = cart)

                result = []

                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['count'] = cart_item.count
                    product = Product.objects.get(id = cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

                return Response(
                    {'cart': result},
                    status = status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'No hay stock de este producto'},
                    status = status.HTTP_422_UNPROCESSABLE_ENTITY
                )
        except:
            return Response(
                {'error': 'Error al actualizar tu carrito'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Eliminar producto de carrito
class RemoveItemView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'ID del producto debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'Este producto no existe'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart = cart, product = product).exists():
                return Response(
                    {'error': 'Este producto no esta en tu cartito'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            CartItem.objects.filter(cart = cart, product = product).delete()

            if not CartItem.objects.filter(cart = cart, product = product).exists():
                total_items = int(cart.total_items) - 1
                Cart.objects.filter(user=user).update(total_items = total_items)

            cart_items = CartItem.objects.order_by('product').filter(cart = cart)

            result = []

            if CartItem.objects.filter(cart = cart).exists():
                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['count'] = cart_item.count
                    product = Product.objects.get(id = cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

            return Response(
                {'cart': result},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al eliminar producto de tu carrito'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Vaciar carrito
class EmptyCartView(APIView):
    def delete(self, request, format = None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user = user)

            if not CartItem.objects.filter(cart = cart).exists():
                return Response(
                    {'success': 'Tu carrito esta vacio'},
                    status = status.HTTP_200_OK)

            CartItem.objects.filter(cart = cart).delete()

            # Actualizamos carrito
            Cart.objects.filter(user = user).update(total_items = 0)

            return Response(
                {'success': 'Se ha limpiado tu carrito correctamente'},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error al limpiar tu carrito'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )