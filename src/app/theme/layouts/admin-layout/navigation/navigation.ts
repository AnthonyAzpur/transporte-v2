export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'empresas',
    title: 'Empresas',
    type: 'group',
    icon: 'icon-navigation', // Puedes usar un icono adecuado
    children: [
      {
        id: 'empresa-list',
        title: 'Empresas',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard', // Ruta para listar empresas
        icon: 'profile', // Usando un icono de ejemplo
      },
      
    ]
  },
  {
    id: 'motos',
    title: 'Motos',
    type: 'group',
    icon: 'icon-navigation', // Puedes usar un icono adecuado
    children: [
      {
        id: 'moto-list',
        title: 'Motos',
        type: 'item',
        classes: 'nav-item',
        url: '/motos', // Ruta para listar motos
        icon: 'profile', // Usando un icono de ejemplo
      },
      
    ]
  },
  {
    id: 'zonas',
    title: 'Zonas',
    type: 'group',
    icon: 'icon-navigation', // Puedes usar un icono adecuado
    children: [
      {
        id: 'zona-list',
        title: 'Zonas',
        type: 'item',
        classes: 'nav-item',
        url: '/zonas', // Ruta para listar zonas
        icon: 'profile', // Usando un icono de ejemplo
      },
      
    ]
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    type: 'group',
    icon: 'icon-users', // Puedes usar un icono adecuado
    children: [
      {
        id: 'usuario-list',
        title: 'Usuarios',
        type: 'item',
        classes: 'nav-item',
        url: '/sample-page', // Ruta para listar usuarios
        icon: 'user', // Usando un icono de ejemplo
      },
      
    ]
  }
];
