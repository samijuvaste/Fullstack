import RadioButton from "./RadioButton";

interface RadioGroupProps {
    name: string;
    options: string[];
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const RadioGroup = (props: RadioGroupProps) => (
    <div>
        {`${props.name}\t`}
        {props.options.map(option => (
            <RadioButton
                key={option}
                name={props.name}
                input={option}
                onChange={props.onChange}
            />
        ))}
    </div>
);

export default RadioGroup;