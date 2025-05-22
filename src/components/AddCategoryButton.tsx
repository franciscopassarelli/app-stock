
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

interface AddCategoryButtonProps {
  onAddCategory: (category: string) => void;
}

export const AddCategoryButton: React.FC<AddCategoryButtonProps> = ({ onAddCategory }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('El nombre de la categoría no puede estar vacío');
      return;
    }

    // En un entorno real, esto debería añadir la categoría al backend
    const category = newCategory.trim();
    onAddCategory(category);
    
    // Cerramos el diálogo después de añadir la categoría
    setIsDialogOpen(false);
    
    // Limpiamos el campo de texto para nueva categoría
    setNewCategory('');
    
    toast.success(`Categoría "${category}" creada correctamente`);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="min-w-10"
          title="Agregar nueva categoría"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Categoría</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <label htmlFor="category-name" className="text-sm font-medium">
              Nombre de la Categoría
            </label>
            <input
              id="category-name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input"
              placeholder="Ingresa el nombre de la categoría"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsDialogOpen(false);
              setNewCategory('');
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handleAddCategory}>
            <Plus className="h-4 w-4 mr-2" />
            Crear Categoría
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
