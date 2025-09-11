import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faRulerHorizontal,
  faRulerVertical,
  faExpandArrowsAlt,
  faCube,
} from '@fortawesome/free-solid-svg-icons';

interface SummaryProps {
  totals: {
    packages: number;
    length: number;
    width: number;
    height: number;
    cubicFeet: number;
  };
}

const CargoSummary = ({ totals }: SummaryProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const items = [
    { label: 'Total Packages', value: totals.packages, icon: faBox },
    { label: 'Total Length', value: totals.length, icon: faRulerHorizontal },
    { label: 'Total Width', value: totals.width, icon: faExpandArrowsAlt },
    { label: 'Total Height', value: totals.height, icon: faRulerVertical },
    {
      label: 'Total Cubic Feet',
      value: totals.cubicFeet.toFixed(2),
      icon: faCube,
      highlight: true,
    },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        mt: 2,
        bgcolor: '#f9f9f9',
        borderRadius: 2,
        border: '1px solid #ddd',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>

      {isMobile ? (
        <Stack spacing={1}>
          {items.map((item) => (
            <Paper
              key={item.label}
              sx={{
                p: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: item.highlight ? '#f0fdf4' : 'white',
                border: '1px solid #eee',
                borderRadius: 1.5,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <FontAwesomeIcon
                  icon={item.icon}
                  color={item.highlight ? 'green' : 'gray'}
                />
                <Typography
                  fontWeight={item.highlight ? 'bold' : 'normal'}
                  color={item.highlight ? 'green' : 'text.primary'}
                >
                  {item.label}
                </Typography>
              </Stack>
              <Typography
                fontWeight={item.highlight ? 'bold' : 'medium'}
                color={item.highlight ? 'green' : 'text.primary'}
              >
                {item.value}
              </Typography>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell>
                <strong>Metric</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Value</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.label}
                sx={item.highlight ? { bgcolor: '#f0fdf4' } : {}}
              >
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FontAwesomeIcon
                      icon={item.icon}
                      color={item.highlight ? 'green' : 'gray'}
                    />
                    <span>{item.label}</span>
                  </Stack>
                </TableCell>
                <TableCell
                  align="right"
                  sx={
                    item.highlight
                      ? { fontWeight: 'bold', color: 'green' }
                      : { fontWeight: 'medium' }
                  }
                >
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default CargoSummary;
