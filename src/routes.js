import AppRoot from './components/app-root.jsx';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import Logout from './views/Logout.jsx';
import Receipt from './views/Receipt.jsx';
import Cart from './views/Cart.jsx';
import Product from './views/Product.jsx';
import Profile from './views/Profile.jsx';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/login',
        component: Login 
      },
      { path: '/signup',
        component: Signup 
      },
      { path: '/logout',
        component: Logout 
      },
      { path: '/receipt',
        component: Receipt 
      },
      { path: '/cart',
        component: Cart 
      },
      { path: '/product',
        component: Product 
      },
      { path: '/profile',
        component: Profile 
      },
    ]
  }
];

export default routes;
