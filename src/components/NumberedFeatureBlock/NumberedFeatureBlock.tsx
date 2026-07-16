export interface NumberedFeature {
  title: string;
  body: string;
}

export default function NumberedFeatureBlock({ features }: { features: NumberedFeature[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
      {features.map((feature, index) => (
        <div key={feature.title} className="flex gap-5">
          <span className="shrink-0 text-3xl font-light text-gold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="mb-2 text-base font-medium text-white">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-gray-700">{feature.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
