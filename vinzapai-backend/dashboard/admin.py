from django.contrib import admin
from .models import Metric, ActivityLog, AIInsight


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ['name', 'value', 'change_percent', 'color', 'order', 'updated_at']
    list_editable = ['order']
    list_filter = ['color', 'updated_at']
    search_fields = ['name']
    fieldsets = (
        ('Basic Information', {'fields': ('name', 'value')}),
        ('Display', {'fields': ('icon', 'color', 'prefix', 'suffix')}),
        ('Change Tracking', {'fields': ('change_percent',)}),
        ('Order', {'fields': ('order',)}),
    )


@admin.register(ActivityLog)
class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ['title', 'activity_type', 'user_name', 'timestamp']
    list_filter = ['activity_type', 'timestamp']
    search_fields = ['title', 'description', 'user_name']
    readonly_fields = ['timestamp']
    fieldsets = (
        ('Activity Details', {'fields': ('activity_type', 'title', 'description')}),
        ('User Information', {'fields': ('user_name',)}),
        ('Timestamp', {'fields': ('timestamp',), 'classes': ('collapse',)}),
    )


@admin.register(AIInsight)
class AIInsightAdmin(admin.ModelAdmin):
    list_display = ['title', 'insight_type', 'priority', 'is_active', 'created_at']
    list_filter = ['priority', 'insight_type', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at']
    fieldsets = (
        ('Insight Details', {'fields': ('title', 'description', 'insight_type')}),
        ('Priority & Status', {'fields': ('priority', 'is_active')}),
        ('Metadata', {'fields': ('created_at',), 'classes': ('collapse',)}),
    )
