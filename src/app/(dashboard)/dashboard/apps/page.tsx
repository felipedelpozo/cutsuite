import AppWhatsApp from '@/components/apps/app-whatsapp';

export default function Apps() {
  return (
    <div className="flex flex-col p-1 sm:p-4">
      <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        <li key="whatsapp" className="rounded-lg border p-4 hover:shadow-md">
          <AppWhatsApp />
        </li>
      </ul>
    </div>
  );
}
