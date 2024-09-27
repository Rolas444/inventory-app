
import { getQuery } from "@/actions/query-actions";
import TopRegisters from "@/components/dashboard/top-registers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { toast } from "sonner";

const DashboardPage = async () => {

  const getTopRegisters = async ()=>{
    const result = await getQuery("transaction", {
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include:{
        user:true,
        product:true,
        typeTransaction:true
      }
      });

      if (result.error) {
        toast.error('Error al obtener usuario');
      }
      if (result.success) {
        return result.data;
      }
    
  }

  const TopRegister = await getTopRegisters();
  
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      {/* <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      > */}
        {/* <div className="flex flex-col items-center gap-1 text-center"> */}
        <div className=" mx-auto flex  flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
          {/* <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]"> */}

            <Card
              className="lg:max-w-full over " x-chunk="charts-01-chunk-0"
            >
              <CardHeader className="space-y-0 pb-2">
                <CardDescription>Últimos </CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  Registros {" "}
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    Por usuarios
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto">
                <TopRegisters topRegister={TopRegister} />
              </CardContent>

            </Card>
            <Card
              className="lg:max-w-md" x-chunk="charts-01-chunk-0"
            >
              <CardHeader className="space-y-0 pb-2">
                <CardDescription>Top </CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  Productos más vendidos {" "}
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    registrados
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>

              </CardContent>

            </Card>
            <Card
              className="lg:max-w-md" x-chunk="charts-01-chunk-0"
            >
              <CardHeader className="space-y-0 pb-2">
                <CardDescription>Total </CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  Ventas {" "}
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    Último mes
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>

              </CardContent>

            </Card>
            <Card
              className="lg:max-w-md" x-chunk="charts-01-chunk-0"
            >
              <CardHeader className="space-y-0 pb-2">
                <CardDescription>Total</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                  Ventas  {" "}
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                    Por plataforma
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>

              </CardContent>

            </Card>
          {/* </div> */}
          {/* <Button className="mt-4">Add Product</Button> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default DashboardPage;
