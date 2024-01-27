import { Search } from "react-feather";
import { Input, InputGroup, InputGroupText } from "reactstrap";

const InputeGroupeSearch = ({ changehandler }) => {
  return (
    <InputGroup className="mb-2">
      <InputGroupText>
        <Search size={20} />
      </InputGroupText>
      <Input
        onChange={changehandler}
        placeholder="جست و جوی دوره ی مورد نظر..."
      />
    </InputGroup>
  );
};

export default InputeGroupeSearch;
