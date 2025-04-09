from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Page, Block
from .serializers import PageSerializer, BlockSerializer
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from django.http import FileResponse
import io

class PageViewSet(viewsets.ModelViewSet):
    serializer_class = PageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Page.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        page = serializer.save(user=self.request.user)
        Block.objects.create(
            page=page,
            type='paragraph',
            content='',
            order=0
        )

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        page = self.get_object()
        blocks = page.blocks.all()

        # Create PDF buffer
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        styles = getSampleStyleSheet()
        
        # Define styles for different block types
        elements = []
        heading_styles = {
            'heading-1': styles['Heading1'],
            'heading-2': styles['Heading2'],
            'heading-3': styles['Heading3'],
        }

        for block in blocks:
            if block.type in heading_styles:
                elements.append(Paragraph(block.content, heading_styles[block.type]))
            elif block.type in ['bulleted-list', 'numbered-list']:
                elements.append(Paragraph(f"• {block.content}", styles['Normal']))
            elif block.type == 'to-do':
                status = '✓' if block.props.get('completed', False) else '□'
                elements.append(Paragraph(f"{status} {block.content}", styles['Normal']))
            elif block.type == 'divider':
                elements.append(Paragraph('---', styles['Normal']))
            elif block.type == 'code':
                elements.append(Paragraph(f'<font name="Courier">{block.content}</font>', styles['Normal']))
            elif block.type == 'image':
                elements.append(Paragraph('[Image]', styles['Normal']))  # Note: Images would need separate handling
            else:
                elements.append(Paragraph(block.content, styles['Normal']))
            elements.append(Spacer(1, 12))

        # Build PDF
        doc.build(elements)
        buffer.seek(0)

        return FileResponse(
            buffer,
            as_attachment=True,
            filename=f"{page.title}.pdf"
        )

class BlockViewSet(viewsets.ModelViewSet):
    serializer_class = BlockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Block.objects.filter(page__user=self.request.user)

    def perform_create(self, serializer):
        page = Page.objects.get(id=self.kwargs['page_id'], user=self.request.user)
        serializer.save(page=page)

    def create(self, request, page_id=None):
        page = Page.objects.get(id=page_id, user=request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        block = self.get_object()
        if block.page.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        block = self.get_object()
        if block.page.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)