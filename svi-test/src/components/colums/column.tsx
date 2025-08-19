"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, SortDesc } from "lucide-react";
import { Check, X } from "@phosphor-icons/react";
import { ArticleInterface } from "@/store/features/interface";
import { Link, redirect } from "react-router-dom";
import { useDeleteArticleMutation } from "@/store/features/api";
import { ApiResponse, DataObject } from "@/types/interface";
import { toast } from "sonner";

export const columnArticles: ColumnDef<ArticleInterface>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          No
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.title || "-";
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Category
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.category || "-";
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Content
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const newData = row.original.content.slice(0, 50) + "...";
      return newData || "-";
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.status || "-";
    },
  },

  {
    id: "actions",
    enableHiding: false,
    // header: "Action",
    cell: ({ row }) => {
      const data = row.original;

      const [deleteArticle, { isLoading }] = useDeleteArticleMutation();

      const handleDelete = async () => {
        try {
          const response: ApiResponse<DataObject<ArticleInterface>> =
            await deleteArticle({
              id: row.original.id,
              status: "thrash",
            }).unwrap();

          if (response?.status == "Success") {
            toast.success(response?.message);
            redirect(`/`);
          }
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white z-10 shadow-sm">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {row.original.status == "publish" && (
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to={`/view/${data?.id}`}>View</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={`/update/${data?.id}`}>Update</Link>
            </DropdownMenuItem>
            {(row.original.status == "publish" ||
              row.original.status == "draft") && (
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Button onClick={() => handleDelete()}>Delete</Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
