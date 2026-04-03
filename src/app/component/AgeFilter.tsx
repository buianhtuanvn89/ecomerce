type Props = {
  selected: string[];
  onChange: (values: string[]) => void;
};

const ageOptions = [
    { label: "0 - 1", value: "0-1" },
    { label: "1 - 3", value: "1-3" },
    { label: "3 - 6", value: "3-6" },
    { label: "6 - 12", value: "6-12" },
    { label: "12+", value: "12+" }
];

export default function AgeFilter({ selected, onChange }: Props) {

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

      {ageOptions.map(a => (
        <label key={a.value} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selected.includes(a.value)}
            onChange={() => toggle(a.value)}
          />
          {a.label}
        </label>
      ))}
    </div>
  );
}