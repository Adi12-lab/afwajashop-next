"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import { axiosInstance } from "~/lib/utils";

import { EditDeleteOperation, Category } from "~/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { AddCategory, DeleteCategory, EditCategory } from "./components";

export default function Categories() {
  const [editDeleteOperation, setEditDeleteOperation] =
    useState<EditDeleteOperation<Category>>();
  const [openEditDelete, setOpenEditDelete] = useState(false);
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category");
      return response.data;
    },
    staleTime: 1000 * 60 *5
  });

  return (
    <>
      <section className="w-full px-5">
        <div className="mt-5">
          <div>
            <h1 className="font-bold text-3xl font-lora">Daftar Kategori</h1>
            <p>Setiap kategori memiliki produk</p>
            <p>Peringatan !!, menghapus kategori akan menghapus produk</p>
          </div>
          <div className="flex my-4">
            <AddCategory />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Gambar</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) &&
                data.map((category: Category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <Image
                        src={category.image as string}
                        alt={category.name}
                        className="h-auto w-auto"
                        width={120}
                        height={120}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={category.isActive ? "success" : "destructive"}
                      >
                        {category.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell>{category._count?.product}</TableCell>
                    <TableCell className="flex items-center gap-x-3">
                      <Button
                        variant="warning"
                        className="flex items-center rounded-xl gap-x-2"
                        onClick={() => {
                          setEditDeleteOperation({
                            data: category,
                            operation: "edit",
                          });
                          // setOpenEditDelete(true)
                          setOpenEditDelete(true);
                        }}
                      >
                        <Pencil />
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex items-center rounded-xl gap-x-2"
                        onClick={() => {
                          setEditDeleteOperation({
                            data: category,
                            operation: "delete",
                          });
                          // setOpenEditDelete(true)
                          setOpenEditDelete(true);
                        }}
                      >
                        <Trash2 />
                        <span>Hapus</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {/* {JSON.stringify(data)} */}
            </TableBody>
          </Table>
        </div>
      </section>
      <EditCategory
        editDeleteOperation={
          editDeleteOperation as EditDeleteOperation<Category>
        }
        isOpen={openEditDelete}
        setIsOpen={setOpenEditDelete}
      />
      <DeleteCategory
        editDeleteOperation={
          editDeleteOperation as EditDeleteOperation<Category>
        }
        isOpen={openEditDelete}
        setIsOpen={setOpenEditDelete}
      />
    </>
  );
}
