"use client";

import { Button } from "@/components/ui/button";
import { CarVm } from "@/types/cars";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Eye, Trash } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export function getColumns(updateData: () => void){
  const deleteAction = async (id: number) => {
    await fetch(`/api/Cars/${id}`, 
        {
            method: "delete"
        });
    updateData();
  };

  const columns: ColumnDef<CarVm>[] = [
    {
      accessorKey: "make",
      header: "Make",
      cell: ({ row }) => {
          const make = row.original.make as string;
          const logoPath = `/car_logos/${make?.toLowerCase() ?? "nothing"}.png`; // Ensure lowercase matching

          return (
          <span className="flex items-center gap-2">
              {/* Check if the image exists (browser will handle missing images with default styling) */}
              <img
              src={logoPath}
              alt={`${make} logo`}
              className="w-6 h-6 object-contain"
              onError={(e) => (e.currentTarget.src = '/car_logos/bmw.png')} // Hide if not found
              />
              {make}
          </span>
          );
      },
    },
    {
      accessorKey: "model",
      header: "Model",
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => (
        <span className="flex items-center gap-2">
          📅 {row.getValue("year")}
        </span>
      ),
    },
    {
      accessorKey: "mileageInKm",
      header: "Mileage (Km)",
      cell: ({ row }) => (
        <span className="flex items-center gap-2">
          🚗 {row.original.mileageInKm.toLocaleString()} km
        </span>
      ),
    },
    {
      accessorKey: "pricePerDay",
      header: "Price per day",
      cell: ({ row }) => (
        <span className="flex items-center gap-2">
          💵 {row.original.pricePerDay} $
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: string = "Available";
        return (
          <Badge
            variant={
              status === "Available"
                ? "default"
                : status === "Sold"
                ? "destructive"
                : "outline"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const car = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="flex gap-2">
                <Eye className="w-4 h-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2" onClick={() => { redirect(`/app/cars/edit/${row.original.id}`); }}>
                <Edit className="w-4 h-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
              <DropdownMenuItem className="text-red-600 focus:text-red-600 flex gap-2" onClick={async () => {await deleteAction(car.id);}}>
                <Trash className="w-4 h-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}

