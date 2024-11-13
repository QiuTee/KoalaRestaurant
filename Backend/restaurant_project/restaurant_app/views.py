from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework import  viewsets
from .response.responses import Responses 
from restaurant_app.serializer import *
from restaurant_app.models import *
from rest_framework.decorators import action
from rest_framework import generics 
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .permission import *

# Create your views here.
# class RegisterAndLoginForCustomer(viewsets.ModelViewSet) : 
#     queryset = User.objects.all() 
#     serializer_class = UserInfoSerializer
    
#     @action(detail = False , methods = ['POST'])
#     def customer_register(self, request) :
#         data = JSONParser().parse(request)
#         password = data.get('password')
#         retypePassword = data.get('retypePassword')

#         # Check the match of the password and re-entered password
#         if not password == retypePassword :
#             return Responses.response_api('Password and Retype Password is not match','401 Unauthorized')
#         serializers = UserInfoSerializer( data = data )
#         # print(data)
#         try :
#             # Check the validity of input data from serializers
#             if serializers.is_valid(raise_exception= True) :
#                 user = serializers.save()
#                 data = {
#                         'id': user.id,
#                         'username': user.username,
#                         'email': user.email, 
#                         'message': 'Please do not skip the last step to verify your account.'
#                     }
#                 return Responses.response_api('Register Successfull','200 OK' , data = data)

#         except Exception as e:
#             return Responses.response_api('str(e)','401 Unauthorized' , error = str(e))
    
#     @action(detail= False , methods=['POST'])
#     def customer_login(self, request): 
#         data = request.data 
#         serializer = CustomerSignUp(data=data)
#         try:
#             if serializer.is_valid():
#                 email = data.get('email')
#                 password = data.get('password')
#                 user = authenticate(email=email, password=password)
#                 if user is None: 
#                     return Responses.response_api("Email or password is not valid", "401 Unauthorized")
                
#                 return Responses.response_api("Login Successful", "200 OK")
#             else:
#                 return Responses.response_api("Invalid data", "400 Bad Request", error=serializer.errors)
                    
#         except Exception as e: 
#             return Responses.response_api(str(e), "500 Internal Server Error", error=str(e))

# create new customer account 
class CustomerRegister(generics.CreateAPIView):
    queryset = CustomerAccount.objects.all() 
    serializer_class = CustomerAccountSerializer

class CreateManagerAccount(generics.CreateAPIView):
    queryset = ManagerAccount.objects.all() 
    serializer_class = MangerAccountSerializer
    
class ManagementEmployeeViewset(viewsets.ModelViewSet):
    queryset = EmployeeInformation.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsManagerUser]
    
    
    def create(self, request, *args, **kwargs):
        data = request.data 
        serializers = self.serializer_class(data = data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return Responses.response_api("Add Employee Successfull","200")
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        serializers = self.serializer_class(instance,data , partial = True ) 
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return  Responses.response_api('Update successfully', '200')

# store booking information of customer 
class CustomerBookingViewset(generics.GenericAPIView):
    queryset = CustomerBookingInformation.objects.all()
    serializer_class = CustomerBookingInfoSerializer

    def post(self, request):
        data = request.data
        print(data.get('phone_number'))
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Responses.response_api('Booking successfully', '200')
        else:
            return Responses.response_api(serializer.errors, '400')

#store feedback from the user 
class FeedBackFromCustomerViewset(APIView):
    permission_classes = [IsManagerUser]
    def post(self, request):
        data = request.data
        serializers = FeedbackFromcustomerSerializer(data = data )
        if serializers.is_valid():
            serializers.save(customer = request.user)
            return Responses.response_api("Feedback successfully",'200')
        return Responses.response_api(serializers.errors,'400')
    

class ManagementProduct(viewsets.ModelViewSet):
    queryset = MenuItems.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes=[IsManagerUser]
    

    
    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.get_object() 
        serializers = self.serializer_class(instance, data, partial = True)
        serializers.is_valid(raise_exception=True)
        serializers.save() 
        return Responses.response_api('Update product successfully') 

