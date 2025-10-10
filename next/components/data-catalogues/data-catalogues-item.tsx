import { Button } from '@headlessui/react';
import { ChartBar } from 'lucide-react';
import { useState } from 'react';

import {
  ArrowRightUpLine,
  DownloadLine,
  StartSFill,
} from '../icons/illustrations';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { StrapiImage } from '../ui/strapi-image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';
import { DataCatalogue } from '@/types/types';

export const DataCatalogueItem = ({
  dataCatalogue,
  locale,
  featured,
  canDownload,
}: {
  dataCatalogue: DataCatalogue;
  locale: string;
  featured?: boolean;
  canDownload?: boolean;
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className={cn('relative', canDownload && 'cursor-pointer')}
        onClick={() => {
          if (canDownload) {
            setOpenDialog(true);
          }
        }}
      >
        {featured && (
          <div className="absolute top-3 left-3 bg-green-50 text-green-600 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
            <StartSFill />
            Featured
          </div>
        )}
        {canDownload && (
          <div className="absolute top-3 right-3 bg-green-50 text-green-600 p-2 rounded-full  flex items-center gap-1 text-sm size-8">
            <DownloadLine />
          </div>
        )}
        <StrapiImage
          className="rounded-3xl object-contain w-full"
          src={dataCatalogue.image.url}
          width={520}
          height={287}
          alt={`${dataCatalogue.title}`}
        />
        <div className="flex items-start justify-between mt-4">
          <div className="grow">
            <h3 className="text-2xl">{dataCatalogue.title}</h3>
            {dataCatalogue.description && (
              <p className="mt-1 text-[#8B9395]">{dataCatalogue.description}</p>
            )}
            {dataCatalogue.tags && (
              <div className="mt-1 flex flex-wrap gap-2">
                {dataCatalogue.tags.split(',').map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#F4F4F4] rounded-full py-1 px-2"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex-none">
            <ArrowRightUpLine />
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="!bg-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>{dataCatalogue.title}</DialogTitle>
          </DialogHeader>
          <div>
            <div className="flex gap-2 text-xs mb-2">
              <div className="py-1 px-2 bg-blue-100 text-blue-600 rounded">
                Energy
              </div>
              <div className="py-1 px-2 bg-green-100 text-green-600 rounded">
                API
              </div>
            </div>
            <Tabs defaultValue="overview">
              <TabsList className="!bg-white">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="mt-5">
                  Real-time renewable energy generation data
                </p>
                <div className="mt-4 grid grid-cols-2 gap-10 w-full">
                  <div>
                    <p className="font-bold">Metadata</p>
                    <div className="flex flex-col gap-1 mt-2">
                      <p className="text-sm flex items-center justify-between">
                        Last Updated: <strong>2024-03-20</strong>
                      </p>
                      <p className="text-sm flex items-center justify-between">
                        Views: <strong>890</strong>
                      </p>
                      <p className="text-sm flex items-center justify-between">
                        Downloads: <strong>0</strong>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">Tags</p>
                    <div className="flex gap-2 text-xs [&_span]:bg-[#F4F4F4] [&_span]:rounded-full [&_span]:py-1 [&_span]:px-2 mt-2">
                      <span>#renewable</span>
                      <span>#energy</span>
                      <span>#solar</span>
                      <span>#wind</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <p className="mt-5">Data Preview</p>
                <Table className="border rounded-lg mt-4">
                  <TableCaption>...showing 1 of 1,234 rows</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] !text-black">
                        Year
                      </TableHead>
                      <TableHead className="!text-black">CO2 (MT)</TableHead>
                      <TableHead className="!text-black">Sector</TableHead>
                      <TableHead className="!text-black">Region</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2024</TableCell>
                      <TableCell>254.3</TableCell>
                      <TableCell>Energy</TableCell>
                      <TableCell>National</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2024</TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>Energy</TableCell>
                      <TableCell>National</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="api">
                <p className="mt-5">API Documentation</p>
                <div className="mt-4 bg-black text-green-400 p-4 rounded text-sm">
                  GET https://api.jc3.gov.my/v1/datasets/2/data
                  <br />
                  Headers:
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;Authorization: Bearer YOUR_API_KEY
                </div>
              </TabsContent>
              <TabsContent value="comments">
                <p className="mt-5">Comments & Feedback</p>
                <div className="mt-4">
                  <textarea
                    rows={4}
                    className="border w-full rounded p-4"
                    placeholder="Share your feedback or ask questions..."
                  />
                  <button className="border border-gray-300 py-2 px-5 rounded-lg flex items-center gap-2 bg-primary text-white">
                    Post Comment
                  </button>
                </div>
                <div className="mt-4 text-center text-gray-500 py-4">
                  No comments yet. Be the first to comment!
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setOpenDialog(false)}
              className="border border-gray-300 py-2 px-5 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => setOpenDialog(false)}
              className="border border-gray-300 py-2 px-5 rounded-lg flex items-center gap-2 bg-primary text-white"
            >
              <ChartBar size={20} />
              Visualize
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
