# Generated by Django 3.2.8 on 2024-11-12 06:59

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import restaurant_app.manager
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='BaseUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.CharField(max_length=50, unique=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('group', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='auth.group')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', restaurant_app.manager.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='CustomerBookingInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('area', models.CharField(max_length=20)),
                ('store', models.CharField(max_length=30)),
                ('customer_name', models.CharField(max_length=255)),
                ('phone_number', models.IntegerField(validators=[django.core.validators.MinValueValidator(100000000), django.core.validators.MaxValueValidator(9999999999)])),
                ('adult', models.IntegerField(null=True)),
                ('children', models.IntegerField(null=True)),
                ('date', models.DateField(max_length=20)),
                ('time', models.TimeField(max_length=20)),
                ('note', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeInformation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='employee/')),
                ('employee_name', models.CharField(max_length=255)),
                ('role', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('phone', models.IntegerField(validators=[django.core.validators.MinValueValidator(100000000), django.core.validators.MaxValueValidator(9999999999)])),
                ('salary', models.DecimalField(decimal_places=2, max_digits=10)),
                ('start_date', models.DateField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='MenuItems',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='product/')),
                ('food_name', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=3, max_digits=10)),
                ('stock', models.IntegerField()),
                ('status', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerAccount',
            fields=[
                ('baseuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='restaurant_app.baseuser')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('phone_number', models.IntegerField(validators=[django.core.validators.MinValueValidator(10000000), django.core.validators.MaxValueValidator(99999999999)])),
                ('customer_name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('join_date', models.DateField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('restaurant_app.baseuser',),
            managers=[
                ('objects', restaurant_app.manager.CustomerManager()),
            ],
        ),
        migrations.CreateModel(
            name='ManagerAccount',
            fields=[
                ('baseuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='restaurant_app.baseuser')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('manager_fullname', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('phone_number', models.IntegerField(validators=[django.core.validators.MinValueValidator(100000000), django.core.validators.MaxValueValidator(9999999999)])),
                ('start_date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('restaurant_app.baseuser',),
            managers=[
                ('objects', restaurant_app.manager.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='FeedbackFromCustomer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=255)),
                ('rating', models.FloatField()),
                ('date', models.DateTimeField(auto_now=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
