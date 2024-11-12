from django.urls import path 
from restaurant_app.views import * 
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
router = DefaultRouter()

router.register(r'management_employee', ManagementEmployeeViewset , basename = 'management_employee')
router.register(r'management_product', ManagementProduct , basename = 'management_product')


urlpatterns = [

    path('customer_booking' , CustomerBookingViewset.as_view(), name='customer_booking'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('customer_register', CustomerRegister.as_view(), name='customer_register' ), 
    path('manager_register', CreateManagerAccount.as_view(), name='manager_register' ),
    path('feedback', FeedBackFromCustomerViewset.as_view(),name='feedback'),
]

urlpatterns += router.urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)