type Props = {
  selected: string[];
  onChange: (values: string[]) => void;
};

const genders = [
  { label: "Nam", value: "BOY" },
  { label: "Nữ", value: "GIRL" },
  { label: "Unisex", value: "UNISEX" }
];

export default function GenderFilter({ selected, onChange }: Props) {

  const toggle = (value: string) => {

    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div>

      <h4>Gender</h4>

      {genders.map(g => (
        <label key={g.value}>

          <input
            type="checkbox"
            checked={selected.includes(g.value)}
            onChange={() => toggle(g.value)}
          />

          {g.label}

        </label>
      ))}

    </div>
  );
}