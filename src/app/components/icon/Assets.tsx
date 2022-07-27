import { ReactComponent as AddCircle } from './assets/add-circle.svg';
import { ReactComponent as Antenna } from './assets/antenna.svg';
import { ReactComponent as Arrow } from './assets/arrow.svg';
import { ReactComponent as Bars } from './assets/bars.svg';
import { ReactComponent as Battery50 } from './assets/battery50.svg';
import { ReactComponent as Bell } from './assets/bell.svg';
import { ReactComponent as Blur } from './assets/blur.svg';
import { ReactComponent as BlurCircle } from './assets/blur-circle.svg';
import { ReactComponent as Bookmark } from './assets/bookmark.svg';
import { ReactComponent as Bubbles } from './assets/bubbles.svg';
import { ReactComponent as Build } from './assets/build.svg';
import { ReactComponent as Bullets } from './assets/bullets.svg';
import { ReactComponent as Chart } from './assets/chart.svg';
import { ReactComponent as CloudRain } from './assets/cloud-rain.svg';
import { ReactComponent as Cog } from './assets/cog.svg';
import { ReactComponent as DotCircle } from './assets/dot-circle.svg';
import { ReactComponent as Drop } from './assets/drop.svg';
import { ReactComponent as Eye } from './assets/eye.svg';
import { ReactComponent as Filter } from './assets/filter.svg';
import { ReactComponent as Fingerprint } from './assets/fingerprint.svg';
import { ReactComponent as GpsFixed } from './assets/gps-fixed.svg';
import { ReactComponent as History } from './assets/history.svg';
import { ReactComponent as Home } from './assets/home.svg';
import { ReactComponent as Input } from './assets/input.svg';
import { ReactComponent as Layers } from './assets/layers.svg';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Navigation } from './assets/navigation.svg';
import { ReactComponent as PauseCircle } from './assets/pause-circle.svg';
import { ReactComponent as People } from './assets/people.svg';
import { ReactComponent as PlayCircle } from './assets/play-circle.svg';
import { ReactComponent as Pressure } from './assets/pressure.svg';
import { ReactComponent as SatelliteDish } from './assets/satellite-dish.svg';
import { ReactComponent as Selected } from './assets/selected.svg';
import { ReactComponent as Star } from './assets/star.svg';
import { ReactComponent as Sun } from './assets/sun.svg';
import { ReactComponent as Swap } from './assets/swap.svg';
import { ReactComponent as Thermometer } from './assets/thermometer.svg';
import { ReactComponent as Timeline } from './assets/timeline.svg';
import { ReactComponent as Times } from './assets/times.svg';
import { ReactComponent as Toll } from './assets/toll.svg';
import { ReactComponent as Triangle } from './assets/triangle.svg';
import { ReactComponent as UserCircle } from './assets/user-circle.svg';
import { ReactComponent as VisibilityOff } from './assets/visibility-off.svg';
import { ReactComponent as VisibilityOn } from './assets/visibility-on.svg';
import { ReactComponent as Warning } from './assets/warning.svg';
import { ReactComponent as Wind } from './assets/wind.svg';
// Nav
import { ReactComponent as Alerts } from './assets/nav/alerts.svg';
import { ReactComponent as Dashboard } from './assets/nav/dashboard.svg';
import { ReactComponent as Logout } from './assets/nav/logout.svg';
import { ReactComponent as Modelling } from './assets/nav/modelling.svg';
import { ReactComponent as Monitoring } from './assets/nav/monitoring.svg';
import { ReactComponent as Reports } from './assets/nav/reports.svg';
import { ReactComponent as SiteConfig } from './assets/nav/site-config.svg';
import { ReactComponent as Support } from './assets/nav/support.svg';
import { ReactComponent as Trajectories } from './assets/nav/trajectories.svg';
import { ReactComponent as UserSettings } from './assets/nav/user-settings.svg';

export type AssetType = keyof Icons;
export type AssetValue = typeof icons[keyof Icons];
type Icons = typeof icons;

export const icons = {
  AddCircle,
  Antenna,
  Arrow,
  Bars,
  Battery50,
  Bell,
  Blur,
  BlurCircle,
  Bookmark,
  Bubbles,
  Build,
  Bullets,
  Chart,
  CloudRain,
  Cog,
  DotCircle,
  Drop,
  Eye,
  Filter,
  Fingerprint,
  GpsFixed,
  History,
  Home,
  Input,
  Layers,
  Menu,
  Navigation,
  PauseCircle,
  People,
  PlayCircle,
  Pressure,
  SatelliteDish,
  Selected,
  Star,
  Sun,
  Swap,
  Thermometer,
  Timeline,
  Times,
  Toll,
  Triangle,
  UserCircle,
  VisibilityOff,
  VisibilityOn,
  Warning,
  Wind,
  // Nav
  Alerts,

  Dashboard,

  Logout,
  Modelling,
  Monitoring,
  Reports,
  SiteConfig,
  Support,
  Trajectories,
  UserSettings,
} as const;
