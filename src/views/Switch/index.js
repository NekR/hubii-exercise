import { Box, Button } from './style.css';

export default class Switch extends Component {
  render() {
    const { value, items, onChange } = this.props;

    return <Box>
      {items.map(item => {
        return <Button
          key={item.value}
          tag="button"
          type="button"
          data-selected={item.value === value}
          onClick={() => onChange(item.value)}
        >{item.text}</Button>
      })}
    </Box>;
  }
}