import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager';

export default function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone;
  return (
    <div className="relative overflow-hidden w-full max-w-7xl mx-auto px-4 md:px-10 xl:px-24">
      <AmbientColor />
      {dynamicZone && (
        <DynamicZoneManager
          dynamicZone={dynamicZone}
          locale={pageData.locale}
        />
      )}
    </div>
  );
}
