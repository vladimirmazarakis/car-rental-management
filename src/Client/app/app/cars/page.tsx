"use client";

import { DataTable } from "@/components/ui/data-table";
import { CarVm } from "@/types/cars";
import { useEffect, useState } from "react";
import { getColumns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [cars, setCars] = useState<CarVm[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    fetch("/api/Cars").then((resp) =>
      resp.json().then((data) => {
        if (data) {
          setCars(data);
        }
      })
    );
  };

  const columns = getColumns(updateData);

  // Search Filter
  const filteredCars = cars.filter((car) => { 
    return (car?.make?.toLowerCase() ?? "").includes(search?.toLowerCase()) ||
           (car?.model?.toLowerCase() ?? "").includes(search?.toLowerCase()) ||
           car?.year?.toString().includes(search) ||
            car?.mileageInKm?.toString().includes(search);
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">Cars</h2>
          <p className="text-gray-500">
            View, edit, delete, and manage your cars efficiently.
          </p>
        </div>
        
      </div>

      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Link href="/app/cars/create/"><Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Car
        </Button></Link>
        
      </div>

      <DataTable columns={columns} data={filteredCars} />
    </>
  );
}

