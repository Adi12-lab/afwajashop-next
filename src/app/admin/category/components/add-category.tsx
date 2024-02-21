import { useState } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categorySchema } from "~/schema";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { axiosInstance, cn } from "~/lib/utils";

function AddCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      isActive: true,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
    }
  };

  const categoryMutation = useMutation({
    mutationKey: ["add-category"],
    mutationFn: async (payload: FormData) => {
      return await axiosInstance
        .post("/category", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      toast.success(`Kategori ${data.name} berhasil ditambahkan`);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onSettled: () => {
      setIsOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Kategori gagal ditambahkan");
    },
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("isActive", values.isActive.toString());
    formData.append("image", image as File);
    categoryMutation.mutate(formData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg ms-auto flex items-center gap-x-3 uppercase font-semibold tracking-wider">
          <PlusCircle />
          Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[650px] pt-8">
        <ScrollArea className="pr-5">
          <DialogHeader>
            <DialogTitle>Tambah Kategori</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kategori</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kategori 1"
                        {...field}
                        disabled={categoryMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Status kategori</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={categoryMutation.isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Jika aktif, maka akan ditampilkan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                {image ? (
                  <Image
                    src={image ? URL.createObjectURL(image) : ""}
                    width={224}
                    height={224}
                    className="h-auto w-auto"
                    alt="Image"
                  />
                ) : (
                  <div className="bg-gray w-56 h-56"></div>
                )}

                <Input
                  type="file"
                  name="gambar"
                  placeholder="pilih gambar"
                  onChange={handleImageChange}
                  disabled={categoryMutation.isPending}
                  // disabled={memberMutation.isPending}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="success"
                  type="submit"
                  className={cn(
                    "font-semibold tracking-wider",
                    "rounded-lg flex items-center gap-x-2"
                  )}
                  disabled={categoryMutation.isPending}
                >
                  {categoryMutation.isPending ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    ""
                  )}
                  Simpan
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default AddCategory;
