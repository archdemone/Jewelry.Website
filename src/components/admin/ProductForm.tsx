'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import clsx from 'clsx';

type ImageItem = {
  id: string;
  file?: File;
  url: string;
  alt: string;
  primary?: boolean;
  progress?: number;
};

export default function ProductForm({
  mode,
  initialData,
}: {
  mode: 'create' | 'edit';
  initialData?: any;
}) {
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const [regularPrice, setRegularPrice] = useState(initialData?.regularPrice || '');
  const [salePrice, setSalePrice] = useState(initialData?.salePrice || '');
  const [costPerItem, setCostPerItem] = useState(initialData?.costPerItem || '');
  const [compareAtPrice, setCompareAtPrice] = useState(initialData?.compareAtPrice || '');
  const [taxable, setTaxable] = useState(initialData?.taxable ?? true);

  const [sku, setSku] = useState(initialData?.sku || '');
  const [barcode, setBarcode] = useState(initialData?.barcode || '');
  const [trackQty, setTrackQty] = useState(initialData?.trackQty ?? true);
  const [stockQty, setStockQty] = useState<number>(initialData?.stockQty || 0);
  const [lowStock, setLowStock] = useState<number>(initialData?.lowStock || 0);
  const [continueWhenOOS, setContinueWhenOOS] = useState(initialData?.continueWhenOOS ?? false);

  const [images, setImages] = useState<ImageItem[]>(initialData?.images || []);

  const [material, setMaterial] = useState(initialData?.material || '');
  const [gemstone, setGemstone] = useState(initialData?.gemstone || '');
  const [sizes, setSizes] = useState<string>(initialData?.sizes || '');
  const [weight, setWeight] = useState(initialData?.weight || '');
  const [dimensions, setDimensions] = useState(initialData?.dimensions || '');
  const [care, setCare] = useState(initialData?.care || '');

  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
  const [urlSlug, setUrlSlug] = useState(initialData?.urlSlug || '');

  useEffect(() => {
    if (!initialData?.slug) setSlug(slugify(name));
    if (!initialData?.urlSlug) setUrlSlug(slugify(name));
  }, [name, initialData?.slug, initialData?.urlSlug]);

  function onDrop(acceptedFiles: File[]) {
    const mapped: ImageItem[] = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      alt: file.name,
    }));
    setImages((prev) => [...prev, ...mapped]);
    // Simulate upload progress
    mapped.forEach((img) => simulateUploadProgress(img.id));
  }

  async function simulateUploadProgress(id: string) {
    for (let p = 10; p <= 100; p += 10) {
      await new Promise((r) => setTimeout(r, 80));
      setImages((prev) => prev.map((i) => (i.id === id ? { ...i, progress: p } : i)));
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024,
  });

  function setPrimary(id: string) {
    setImages((prev) => prev.map((i) => ({ ...i, primary: i.id === id })));
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((i) => i.id !== id));
  }

  function moveImage(id: string, dir: -1 | 1) {
    setImages((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const swap = idx + dir;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  }

  function addTag(tag: string) {
    if (!tag) return;
    setTags((prev) => Array.from(new Set([...prev, tag])));
  }
  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleSave() {
    // TODO: Wire to API
    alert(`${mode === 'create' ? 'Created' : 'Saved'} product (mock)`);
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Card className="space-y-3 p-4">
          <div className="font-semibold">Basic Information</div>
          <Input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
          <select
            className="rounded border px-2 py-1 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="rings">Rings</option>
            <option value="necklaces">Necklaces</option>
          </select>
          <div>
            <div className="mb-1 text-sm text-gray-600">Tags</div>
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="rounded bg-gray-100 px-2 py-1 text-xs">
                  {t}
                  <button className="ml-1 text-gray-500" onClick={() => removeTag(t)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTag((e.target as HTMLInputElement).value.trim());
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  const input = document.activeElement as HTMLInputElement;
                  if (input?.value) {
                    addTag(input.value.trim());
                    input.value = '';
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </Card>

        <Card className="space-y-3 p-4">
          <div className="font-semibold">Images</div>
          <div
            {...getRootProps()}
            className={clsx(
              'cursor-pointer rounded border-2 border-dashed p-6 text-center',
              isDragActive ? 'bg-amber-50' : 'bg-white',
            )}
          >
            <input {...getInputProps()} />
            <div>Drag & drop images here, or click to select (JPG, PNG, WEBP)</div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.map((img, idx) => (
              <div key={img.id} className="relative rounded border p-2">
                <div className="relative h-32 w-full">
                  <Image src={img.url} alt={img.alt} fill className="rounded object-cover" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                </div>
                {img.progress && img.progress < 100 && (
                  <div className="absolute inset-0 flex items-end bg-white/60">
                    <div className="h-1 w-full bg-gray-200">
                      <div className="h-1 bg-amber-500" style={{ width: `${img.progress}%` }} />
                    </div>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="primary"
                      checked={!!img.primary}
                      onChange={() => setPrimary(img.id)}
                    />{' '}
                    Primary
                  </label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => moveImage(img.id, -1)} className="text-gray-600">
                      ◀
                    </button>
                    <button onClick={() => moveImage(img.id, 1)} className="text-gray-600">
                      ▶
                    </button>
                    <button onClick={() => removeImage(img.id)} className="text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-3 p-4">
          <div className="font-semibold">Product Details</div>
          <Input
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <Input
            placeholder="Gemstone details"
            value={gemstone}
            onChange={(e) => setGemstone(e.target.value)}
          />
          <Input
            placeholder="Size options (comma separated)"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
          />
          <Input placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <Input
            placeholder="Dimensions"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
          />
          <Textarea
            placeholder="Care instructions"
            value={care}
            onChange={(e) => setCare(e.target.value)}
          />
        </Card>

        <Card className="space-y-3 p-4">
          <div className="font-semibold">SEO</div>
          <Input
            placeholder="Meta title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
          <Textarea
            placeholder="Meta description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
          <Input
            placeholder="URL slug"
            value={urlSlug}
            onChange={(e) => setUrlSlug(e.target.value)}
          />
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="space-y-3 p-4">
          <div className="font-semibold">Pricing</div>
          <Input
            placeholder="Regular price"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
          />
          <Input
            placeholder="Sale price"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
          <Input
            placeholder="Cost per item"
            value={costPerItem}
            onChange={(e) => setCostPerItem(e.target.value)}
          />
          <Input
            placeholder="Compare at price"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={taxable}
              onChange={(e) => setTaxable(e.target.checked)}
            />
            Taxable
          </label>
        </Card>

        <Card className="space-y-3 p-4">
          <div className="font-semibold">Inventory</div>
          <Input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
          <Input
            placeholder="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={trackQty}
              onChange={(e) => setTrackQty(e.target.checked)}
            />
            Track quantity
          </label>
          <Input
            placeholder="Stock quantity"
            value={stockQty}
            onChange={(e) => setStockQty(Number((e.target as HTMLInputElement).value || 0))}
          />
          <Input
            placeholder="Low stock threshold"
            value={lowStock}
            onChange={(e) => setLowStock(Number((e.target as HTMLInputElement).value || 0))}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={continueWhenOOS}
              onChange={(e) => setContinueWhenOOS(e.target.checked)}
            />
            Continue selling when out of stock
          </label>
        </Card>

        <div className="flex gap-2">
          <Button onClick={handleSave}>
            {mode === 'create' ? 'Create Product' : 'Save Changes'}
          </Button>
          <Button variant="outline">Save & continue</Button>
          <Button variant="outline">Save & add another</Button>
          <Button variant="ghost">Preview</Button>
        </div>
      </div>
    </div>
  );
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
