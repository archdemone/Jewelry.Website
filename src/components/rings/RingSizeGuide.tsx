'use client';

import { motion } from 'framer-motion';
import { Download, Ruler } from 'lucide-react';

const RingSizeGuide = () => {
  const sizeChart = [
    { us: 4, uk: 'H', eu: '48', mm: '47.8' },
    { us: 4.5, uk: 'H½', eu: '49', mm: '48.6' },
    { us: 5, uk: 'I', eu: '50', mm: '49.3' },
    { us: 5.5, uk: 'I½', eu: '51', mm: '50.1' },
    { us: 6, uk: 'J', eu: '52', mm: '50.8' },
    { us: 6.5, uk: 'J½', eu: '53', mm: '51.6' },
    { us: 7, uk: 'K', eu: '54', mm: '52.3' },
    { us: 7.5, uk: 'K½', eu: '55', mm: '53.1' },
    { us: 8, uk: 'L', eu: '56', mm: '53.8' },
    { us: 8.5, uk: 'L½', eu: '57', mm: '54.6' },
    { us: 9, uk: 'M', eu: '58', mm: '55.3' },
    { us: 9.5, uk: 'M½', eu: '59', mm: '56.1' },
    { us: 10, uk: 'N', eu: '60', mm: '56.8' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold">Find Your Perfect Size</h3>

      {/* Interactive Ring Sizer */}
      <div className="grid gap-6 md:grid-cols-2">
              <div>
              <h4 className="mb-2 font-medium">Size Chart</h4>
              <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
              <thead>
              <tr className="border-b border-gray-200">
              <th className="p-2 text-left font-medium">US</th>
              <th className="p-2 text-left font-medium">UK</th>
              <th className="p-2 text-left font-medium">EU</th>
              <th className="p-2 text-left font-medium">MM</th>
              </tr>
              </thead>
              <tbody>
                {sizeChart.map((size, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-2">{size.us}</td>
              <td className="p-2">{size.uk}</td>
              <td className="p-2">{size.eu}</td>
              <td className="p-2">{size.mm}</td>
              </tr>
                ))}
              </tbody>
              </table>
              </div>
              </div>
              <div>
              <h4 className="mb-2 font-medium">How to Measure</h4>
              <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                1
              </span>
              <span>Wrap a piece of string or paper around your finger</span>
              </li>
              <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                2
              </span>
              <span>Mark where the string overlaps</span>
              </li>
              <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                3
              </span>
              <span>Measure the length in millimeters</span>
              </li>
              <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                4
              </span>
              <span>Find your size in the chart above</span>
              </li>
              </ol>
              <motion.button whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} className="mt-4 flex items-center gap-2 text-sm text-primary underline hover:opacity-80">
              <Download className="h-4 w-4" />
            Download Printable Ring Sizer
          </motion.button>
              </div>
              </div>

      {/* Tips */}
      <div className="mt-6 rounded-lg border bg-white p-4">
              <h4 className="mb-2 flex items-center gap-2 font-medium">
              <Ruler className="h-4 w-4 text-primary" />
          Pro Tips
        </h4>
              <ul className="space-y-1 text-sm text-gray-600">
              <li>• Measure your finger when it's at room temperature</li>
              <li>• Avoid measuring when your hands are cold or swollen</li>
              <li>• Measure the finger you plan to wear the ring on</li>
              <li>• Consider seasonal changes in finger size</li>
              </ul>
              </div>
              </motion.div>
  );
};

export default RingSizeGuide;
