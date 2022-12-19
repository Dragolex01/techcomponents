from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile
from .serializers import UserProfileSerializer

class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': user_profile.data},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Algo salió mal al recuperar el perfil'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateUserProfile(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            region = data['region'],
            city = data['city'],
            province = data['province'],
            address = data['address'],
            postal_code = data['postal_code']

            UserProfile.objects.filter(user=user).update(
                region = region,
                city = city,
                province = province,
                address = address,
                postal_code = postal_code
            )

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': user_profile.data},
                status = status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Algo salió mal al actualizar el perfil'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )