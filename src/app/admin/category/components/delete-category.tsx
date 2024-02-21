import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "~/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { EditDeleteProps, Category } from "~/types";
import { Loader2 } from "lucide-react";

function DeleteCategory({
  editDeleteOperation,
  isOpen,
  setIsOpen,
}: EditDeleteProps<Category>) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (categoryId: number) => {
      const res = await axiosInstance.delete("/category/" + categoryId);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Kategori ${data.name} berhasil dihapus`);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onSettled: () => {
      setIsOpen(false);
    },
    onError: (data) => {
      toast.error(`Kategori ${data.name} gagal dihapus`);
    },
  });

  const handleDelete = () => {
    if (editDeleteOperation.data) {
      deleteMutation.mutate(editDeleteOperation.data.id as number);
    }
  };

  return (
    <AlertDialog
      open={isOpen && editDeleteOperation.operation === "delete"}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Hapus kategori{" "}
            {editDeleteOperation && editDeleteOperation.data?.name}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Pastikan semua produk terhapus
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button
            variant="outlineDark"
            onClick={() => {
              setIsOpen(false);
            }}
            className="rounded-xl"
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-xl flex items-center"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            {deleteMutation.isPending && <Loader2 className="animate-spin mr-2" />}
            <span>Hapus</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategory;
