import { Wrap, Box, Bar, Value, DateBox } from './style.css';

export default class Entry extends Component {
  render() {
    const { price_high, time_period_start } = this.props.entry;
    const { highest, lowest } = this.props;
    const percent = (price_high - lowest) / (highest - lowest);

    let date = new Date(time_period_start);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    return <Wrap>
      <Box>
        <Value>${price_high}</Value>
        <Bar style={{ height: 50 + 50 * percent + '%' }} />
        <DateBox>{date.toLocaleDateString()}</DateBox>
      </Box>
    </Wrap>;
  }
}