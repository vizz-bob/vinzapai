from django.contrib import admin
from .models import Project, TeamMember


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'status', 'progress', 'team_size', 'ai_score', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at']
    fieldsets = (
        ('Project Information', {'fields': ('name', 'description', 'status')}),
        ('Progress & Metrics', {'fields': ('progress', 'ai_score')}),
        ('Financial', {'fields': ('budget', 'spent')}),
        ('Timeline', {'fields': ('start_date', 'end_date')}),
        ('Team', {'fields': ('team_size',)}),
        ('Metadata', {'fields': ('created_at',), 'classes': ('collapse',)}),
    )


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'role', 'department', 'is_active', 'ai_productivity_score']
    list_filter = ['role', 'department', 'is_active']
    search_fields = ['name', 'email']
    readonly_fields = ['joined_date']
    fieldsets = (
        ('Personal Information', {'fields': ('name', 'email', 'avatar_initials')}),
        ('Position', {'fields': ('role', 'department')}),
        ('Performance', {'fields': ('ai_productivity_score',)}),
        ('Status', {'fields': ('is_active',)}),
        ('Dates', {'fields': ('joined_date',), 'classes': ('collapse',)}),
    )
