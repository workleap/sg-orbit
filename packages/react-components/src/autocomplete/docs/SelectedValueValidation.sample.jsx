() => {
    const [isValid, setIsValid] = useState(false);

    const handleChange = useCallback((event, selection) => {
        setIsValid(!isNil(selection) && selection.key === "earth");
        console.log(selection);
    }, [setIsValid]);

    return (
        <Autocomplete
            defaultValue="Mars"
            validationState={isValid ? "valid" : "invalid"}
            placeholder="Planets"
            onChange={handleChange}
            aria-label="Planets"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Autocomplete>
    );
};
