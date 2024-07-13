import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export const Logo = forwardRef(
  ({ width = 40, height = 40, disableLink = false, className, href = '/', sx, ...other }, ref) => {
    const theme = useTheme();

    const gradientId = useId();

    const PRIMARY_LIGHT = theme.vars.palette.primary.light;

    const PRIMARY_MAIN = theme.vars.palette.primary.main;

    const PRIMARY_DARK = theme.vars.palette.primary.dark;

    //  * OR using local (public folder)
    const logo = (
      <Box
        alt="logo"
        component="img"
        src={`${CONFIG.site.basePath}/assets/icons/navbar/Pabbly Logo Icon SVG.svg`}
        width={width}
        height={height}
      />
    );

    // const logo = (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="2014"
    //     height="2009"
    //     viewBox="0 0 2014 2009"
    //     fill="white"
    //   >
    //     <path
    //       d="M2014 1004.5C2014 1559.1 1563.14 2008.68 1007 2008.68C832.627 2008.68 668.607 1964.5 525.593 1886.72C212.457 1716.43 0 1385.22 0 1004.5C0 449.914 450.849 0.324219 1006.99 0.324219C1563.14 0.324219 2014 449.914 2014 1004.5Z"
    //       fill="#20B276"
    //     />
    //     <path
    //       d="M1408.74 1290.25C1302.17 1399.74 1172.83 1454.53 1020.76 1454.53C927.944 1454.53 841.711 1438.87 760.872 1393.37L759.899 1976.4L752.239 1974.34L747.497 1973.13L741.9 1970.09L739.261 1965.33L736.832 1959.96L739.526 1956.59L472.838 1639.59L472.916 890.235C472.916 734.095 526.196 601.485 632.779 492.382C739.339 383.272 868.67 328.729 1020.76 328.729C1172.83 328.729 1302.16 383.466 1408.74 492.98C1515.3 602.478 1568.6 735.367 1568.6 891.625C1568.6 1047.9 1515.3 1180.76 1408.74 1290.25ZM1205.31 701.833C1154.71 649.796 1093.19 623.789 1020.76 623.789C948.302 623.789 886.785 649.796 836.199 701.833C785.597 753.869 760.296 817.12 760.296 891.64C760.296 966.137 785.589 1029.39 836.199 1081.42C886.785 1133.47 948.302 1159.49 1020.76 1159.49C1093.19 1159.49 1154.71 1133.47 1205.31 1081.42C1255.91 1029.39 1281.21 966.137 1281.21 891.64C1281.21 817.12 1255.91 753.861 1205.31 701.833Z"
    //       fill="#147F52"
    //     />
    //     <path
    //       d="M1387.73 1269.55C1281.15 1379.09 1151.81 1433.88 999.726 1433.88C906.909 1433.88 820.093 1411.12 739.257 1365.61L739.172 1973.17C739.172 1973.17 719.498 1967.77 693.892 1959.52C687.578 1957.49 681.202 1955.31 674.522 1952.96C671.345 1951.83 669.796 1951.17 666.526 1950.23C658.149 1947.83 647.53 1943.18 639.347 1940.01C611.849 1929.33 589.567 1919.16 589.03 1918.91C588.493 1918.65 509.782 1881.21 500.907 1875.68C492.958 1870.73 485.881 1866.85 479.816 1862.51C477.878 1861.13 476.414 1860.14 474.577 1858.88C460.158 1849 452.1 1843.32 452.1 1843.32L451.859 869.427C451.859 713.231 505.142 580.581 611.732 471.453C718.307 362.302 847.638 307.75 999.734 307.75C1151.82 307.75 1281.15 362.504 1387.74 472.051C1494.31 581.582 1547.62 714.512 1547.62 870.809C1547.6 1027.11 1494.3 1160.02 1387.73 1269.55ZM1184.29 680.952C1133.68 628.899 1072.17 602.884 999.718 602.884C927.26 602.884 865.739 628.899 815.15 680.952C764.544 733.004 739.25 796.274 739.25 870.809C739.25 945.336 764.544 1008.61 815.15 1060.65C865.739 1112.73 927.26 1138.75 999.718 1138.75C1072.16 1138.75 1133.68 1112.73 1184.29 1060.65C1234.88 1008.61 1260.2 945.336 1260.2 870.809C1260.2 796.274 1234.88 733.004 1184.29 680.952Z"
    //       fill="white"
    //     />
    //   </svg>
    // );

    return (
      <NoSsr
        fallback={
          <Box
            width={width}
            height={height}
            className={logoClasses.root.concat(className ? ` ${className}` : '')}
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              verticalAlign: 'middle',
              ...sx,
            }}
          />
        }
      >
        <Box
          ref={ref}
          component={RouterLink}
          href={href}
          width={width}
          height={height}
          className={logoClasses.root.concat(className ? ` ${className}` : '')}
          aria-label="logo"
          sx={{
            flexShrink: 0,
            display: 'inline-flex',
            verticalAlign: 'middle',
            ...(disableLink && { pointerEvents: 'none' }),
            ...sx,
          }}
          {...other}
        >
          {logo}
        </Box>
      </NoSsr>
    );
  }
);