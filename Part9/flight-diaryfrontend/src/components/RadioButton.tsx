interface RadioButtonProps {
    name: string;
    input: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButton = (props: RadioButtonProps) => (
    <>
        {props.input}
        <input
            type='radio'
            name={props.name}
            onChange={() => props.onChange(props.input)}
        />
    </>
);

export default RadioButton;