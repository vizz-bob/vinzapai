from django.contrib import admin
from .models import RevenueData, UserGrowth, TrafficSource


@admin.register(RevenueData)
class RevenueDataAdmin(admin.ModelAdmin):
    list_display = ['month', 'year', 'revenue', 'expenses', 'profit']
    list_filter = ['year', 'month']
    search_fields = ['month']
    ordering = ['-year', '-month']
    fieldsets = (
        ('Period', {'fields': ('month', 'year')}),
        ('Financial Data', {'fields': ('revenue', 'expenses', 'profit')}),
    )


@admin.register(UserGrowth)
class UserGrowthAdmin(admin.ModelAdmin):
    list_display = ['month', 'year', 'new_users', 'active_users', 'churned_users']
    list_filter = ['year', 'month']
    search_fields = ['month']
    ordering = ['-year', '-month']
    fieldsets = (
        ('Period', {'fields': ('month', 'year')}),
        ('User Data', {'fields': ('new_users', 'active_users', 'churned_users')}),
    )


@admin.register(TrafficSource)
class TrafficSourceAdmin(admin.ModelAdmin):
    list_display = ['source', 'visitors', 'percentage', 'color']
    list_filter = ['source']
    search_fields = ['source']
    fieldsets = (
        ('Source Information', {'fields': ('source', 'color')}),
        ('Traffic Data', {'fields': ('visitors', 'percentage')}),
    )
