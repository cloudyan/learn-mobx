import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul className={styles.nav}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mobx-only">mobx-only</Link>
        </li>
        <li>
          <Link to="/mobx-react">mobx-react</Link>
        </li>
        <li>
          <Link to="/mobx-simple">mobx-simple</Link>
        </li>
        <li>
          <Link to="/message">message</Link>
        </li>
        <li>
          <Link to="/trace">trace</Link>
        </li>
        <li>
          <Link to="/computed-fn">computed-fn</Link>
        </li>
        <li>
          <Link to="/mobx-editor">mobx-editor</Link>
        </li>
        {/* <li>
          <Link to="/lowcode">lowcode</Link>
        </li>
        <li>
          <Link to="/preview">preview</Link>
        </li> */}
      </ul>
      <Outlet />
    </div>
  );
}
