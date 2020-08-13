// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	AdMobFreeBannerConfig: {
		isTesting: true,
 		autoShow: true
	},
	firebase: {
		apiKey: "AIzaSyC7OssIThUAOUo-QcjejeQ1-ytjw-QOElA",
		authDomain: "multi4ionic.firebaseapp.com",
		databaseURL: "https://multi4ionic.firebaseio.com",
		projectId: "multi4ionic",
		storageBucket: "multi4ionic.appspot.com",
		messagingSenderId: "719400134543"
	},
	stripe_publish_key: 'pk_test_nqykHcHCdCnWPJCD6pguqShK',
	google_project_number: '762391382612',
	fb_app: 571610369618746,
	fb_v: "v3.2",
	paypal_sandbox_client_id: "Ac-QK_Lkar46qQDWcp1kega6aPk13SxXv3dkCVX7A2Nlw7BViP3JyDUQQg-6W386yjgaeEHTuaO9BxGx",
	paypal_live_client_id: "",
	languages: {
   		'en':'English',
   		'vi':'Vietnamese'
	},
	menu: [
	{
      name: 'Restaurants',
      path: '/home',
	  component: 'HomePage',
      icon: 'restaurant'
    },
	{
      name: 'My Cart',
      path: '/cart',
	  component: 'CartPage',
      icon: 'basket'
    },
	{
      name: 'My Order',
      path: '/orders',
	  component: 'OrdersPage',
      icon: 'folder'
    },
	{
      name: 'Map',
      path: '/map',
	  component: 'MapPage',
      icon: 'locate'
    },
	{
      name: 'Language',
      path: '/translate',
	  component: 'TranslatePage',
      icon: 'globe'
    },
	{
      name: 'Settings',
      path: '/settings',
	  component: 'SettingsPage',
      icon: 'settings'
    },
	{
      name: 'Wishlist',
      path: '/wishlist',
	  component: 'WishlistPage',
      icon: 'heart'
    },	
	{
      name: 'My Addresses',
      path: '/address',
	  component: 'AddressPage',
      icon: 'folder-open'
    },
	{
      name: 'Change Password',
      path: '/profile',
	  component: 'ProfilePage',
      icon: 'aperture'
    },
	{
      name: 'Add New Address',
      path: '/new-address',
	  component: 'NewAddressPage',
      icon: 'add-circle-outline'
    },
	{
      name: 'Change Profile Image',
      path: '/upload',
	  component: 'UploadPage',
      icon: 'camera'
    },
	/**
	{
		name: 'Restaurants',
		path: '/home',
		component: 'HomePage',
		icon: 'restaurant',
	},{
		name: 'MyCart',
		path: '/cart',
		component: 'CartPage',
		icon: 'md-basket',
	},{
		name: 'FoodSearch',
		path: '/food-search',
		component: 'FoodSearchPage',
		icon: 'pizza',
	},{
		name: 'MyOrder',
		path: '/orders',
		component: 'OrdersPage',
		icon: 'md-clipboard',
	},{
		name: 'Map',
		path: '/map',
		component: 'MapPage',
		icon: 'compass',
	},{
		name: 'WishList',
		path: '/wishlist',
		component: 'WishlistPage',
		icon: 'md-heart-empty',
	},{
		name: 'MyAddresses',
		path: '/my-address',
		component: 'MyAddressPage',
		icon: 'create',
	},{
		name: 'ChatList',
		path: '/chat-list',
		component: 'ChatListPage',
		icon: 'chatboxes',
	},{
		name: 'MyProfile',
		path: '/profile',
		component: 'ProfilePage',
		icon: 'construct',
	},{
		name: 'ForgotPassword',
		path: '/forgot',
		component: 'ForgotPage',
		icon: 'lock',
	},{
		name: 'Languages',
		path: '/translate',
		component: 'TranslatePage',
		icon: 'globe',
	}
	**/
	
	],

	
	themes: [{
		name:'Orange',
		primary: '#ff9800',
		secondary: '#7d65e8',
		tertiary: '#ffab40',
		light: '#fff3e0',
		medium: '#ffdaa3',
		dark: '#1a1714'
	}],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
