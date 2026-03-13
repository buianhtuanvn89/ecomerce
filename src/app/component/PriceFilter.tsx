type Props = {
  selected: string[];
  onChange: (values: string[]) => void;
};

const priceOptions = [
  { label: "0 - 100", value: "0-100" },
  { label: "100 - 200", value: "100-200" },
  { label: "200 - 500", value: "200-500" },
  { label: "500+", value: "500-" }
];

export default function PriceFilter({ selected, onChange }: Props) {

  const toggle = (value: string) => {

    let newValues: string[];

    if (selected.includes(value)) {
      newValues = selected.filter(v => v !== value);
    } else {
      newValues = [...selected, value];
    }

    onChange(newValues);
  };

  return (
    <div>
      <h3>Price</h3>

      {priceOptions.map(p => (
        <label key={p.value} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selected.includes(p.value)}
            onChange={() => toggle(p.value)}
          />
          {p.label}
        </label>
      ))}
    </div>
  );
}