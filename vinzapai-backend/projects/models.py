from django.db import models


class Project(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
        ('planning', 'Planning'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    progress = models.IntegerField(default=0)
    budget = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    spent = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    team_size = models.IntegerField(default=1)
    ai_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Projects'

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('developer', 'Developer'),
        ('designer', 'Designer'),
        ('manager', 'Manager'),
        ('analyst', 'Analyst'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    department = models.CharField(max_length=100)
    avatar_initials = models.CharField(max_length=3, blank=True)
    is_active = models.BooleanField(default=True)
    joined_date = models.DateField(auto_now_add=True)
    ai_productivity_score = models.IntegerField(default=0)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Team Members'

    def __str__(self):
        return self.name
