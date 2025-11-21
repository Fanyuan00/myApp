import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonButtons,
  IonIcon,
  IonBadge,
  IonText,
  IonToast,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search, cart, searchOutline, checkmark } from 'ionicons/icons';

// Custom Pipe for Category Filtering
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory',
  standalone: true
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: any[], category: string): any[] {
    if (!products) return [];
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  }
}

@Pipe({
  name: 'filterBySearch',
  standalone: true
})
export class FilterBySearchPipe implements PipeTransform {
  transform(products: any[], searchTerm: string): any[] {
    if (!products || !searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }
}

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSearchbar,
    IonButtons,
    IonIcon,
    IonBadge,
    IonText,
    IonToast,
    IonFab,
    IonFabButton,
    FilterByCategoryPipe,
    FilterBySearchPipe,
    CommonModule, 
    FormsModule
  ]
})
export class ProductListPage implements OnInit {
  selectedCategory: string = 'all';
  searchTerm: string = '';
  showSearch: boolean = false;
  showCartToast: boolean = false;
  cartItems: CartItem[] = [];

  products: Product[] = [
    // Graphics Cards
    {
      id: 1,
      name: 'RTX 4090 Gaming',
      brand: 'NVIDIA',
      description: 'High-performance gaming GPU with ray tracing and DLSS 3.0',
      price: '$1,599',
      image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'gpu',
      rating: 4.8
    },
    {
      id: 2,
      name: 'RX 7900 XTX',
      brand: 'AMD',
      description: 'High-end AMD graphics card with advanced ray tracing',
      price: '$999',
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'gpu',
      rating: 4.6
    },

    // Processors
    {
      id: 3,
      name: 'Intel i9-14900K',
      brand: 'Intel',
      description: '14th Gen Intel Core i9 processor with 24 cores',
      price: '$589',
      image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-printed-circuit-board-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'cpu',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Ryzen 9 7950X',
      brand: 'AMD',
      description: 'AMD Ryzen 9 processor with 16 cores and 32 threads',
      price: '$699',
      image: 'https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'cpu',
      rating: 4.8
    },

    // Motherboards
    {
      id: 5,
      name: 'Z790 AORUS Elite',
      brand: 'Gigabyte',
      description: 'Advanced motherboard for latest Intel processors',
      price: '$349',
      image: 'https://images.pexels.com/photos/2588754/pexels-photo-2588754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'motherboard',
      rating: 4.5
    },
    {
      id: 11,
      name: 'B650 Gaming Plus',
      brand: 'MSI',
      description: 'AMD compatible motherboard with PCIe 5.0',
      price: '$279',
      image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'motherboard',
      rating: 4.4
    },

    // Memory
    {
      id: 6,
      name: 'DDR5 32GB Kit',
      brand: 'Corsair',
      description: 'High-speed DDR5 memory for gaming PCs',
      price: '$129',
      image: 'https://images.pexels.com/photos/2588758/pexels-photo-2588758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'memory',
      rating: 4.4
    },
    {
      id: 12,
      name: 'Vengeance RGB 64GB',
      brand: 'Corsair',
      description: 'RGB DDR5 memory with high frequency',
      price: '$249',
      image: 'https://images.pexels.com/photos/2588759/pexels-photo-2588759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'memory',
      rating: 4.6
    },

    // Storage
    {
      id: 7,
      name: 'NVMe SSD 2TB',
      brand: 'Samsung',
      description: 'Ultra-fast NVMe SSD for gaming and work',
      price: '$199',
      image: 'https://images.pexels.com/photos/5064577/pexels-photo-5064577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'storage',
      rating: 4.7
    },
    {
      id: 13,
      name: 'WD Black 4TB',
      brand: 'Western Digital',
      description: 'High-capacity SSD for content creators',
      price: '$399',
      image: 'https://images.pexels.com/photos/5064578/pexels-photo-5064578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'storage',
      rating: 4.8
    },

    // Power Supply
    {
      id: 8,
      name: '850W Gold PSU',
      brand: 'Seasonic',
      description: '80 Plus Gold certified power supply',
      price: '$149',
      image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'psu',
      rating: 4.6
    },
    {
      id: 14,
      name: '1200W Platinum',
      brand: 'Corsair',
      description: 'High-wattage PSU for multi-GPU setups',
      price: '$299',
      image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'psu',
      rating: 4.7
    },

    // Cooling
    {
      id: 9,
      name: 'Liquid Cooler 360mm',
      brand: 'NZXT',
      description: 'AIO liquid cooler for optimal performance',
      price: '$159',
      image: 'https://images.pexels.com/photos/2588755/pexels-photo-2588755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'cooling',
      rating: 4.5
    },
    {
      id: 15,
      name: 'Dark Rock Pro 4',
      brand: 'be quiet!',
      description: 'High-performance air cooler with dual fans',
      price: '$89',
      image: 'https://images.pexels.com/photos/2588756/pexels-photo-2588756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'cooling',
      rating: 4.4
    },

    // Cases
    {
      id: 10,
      name: 'Gaming Case RGB',
      brand: 'Lian Li',
      description: 'Tempered glass gaming case with RGB lighting',
      price: '$129',
      image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'case',
      rating: 4.3
    },
    {
      id: 16,
      name: 'H9 Flow',
      brand: 'NZXT',
      description: 'Dual-chamber case with excellent airflow',
      price: '$159',
      image: 'https://images.pexels.com/photos/1714205/pexels-photo-1714205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'case',
      rating: 4.6
    }
  ];

  constructor() {
    addIcons({ search, cart, searchOutline, checkmark });
  }

  ngOnInit() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('pcBuilderCart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  filterByCategory(event: any) {
    this.selectedCategory = event.detail.value;
  }

  searchProducts(event: any) {
    this.searchTerm = event.detail.value || '';
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchTerm = '';
    }
  }

  viewProductDetails(product: Product) {
    console.log('View product details:', product);
    // Navigate to product detail page
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    // Save to localStorage
    localStorage.setItem('pcBuilderCart', JSON.stringify(this.cartItems));
    
    // Show toast
    this.showCartToast = true;
    
    console.log('Cart updated:', this.cartItems);
  }

  isInCart(product: Product): boolean {
    return this.cartItems.some(item => item.id === product.id);
  }

  viewCart() {
    console.log('View cart:', this.cartItems);
    // Navigate to cart page or show modal
    alert(`You have ${this.cartItems.length} items in your cart!\nTotal: $${this.getCartTotal()}`);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  }

  clearFilters() {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.showSearch = false;
  }

  getCategoryColor(category: string): string {
    const colors: {[key: string]: string} = {
      'gpu': 'primary',
      'cpu': 'secondary',
      'motherboard': 'tertiary',
      'memory': 'success',
      'storage': 'warning',
      'cooling': 'danger',
      'psu': 'dark',
      'case': 'medium'
    };
    return colors[category] || 'primary';
  }

  getCategoryLabel(category: string): string {
    const labels: {[key: string]: string} = {
      'gpu': 'GPU',
      'cpu': 'CPU',
      'motherboard': 'MOBO',
      'memory': 'RAM',
      'storage': 'SSD',
      'cooling': 'COOL',
      'psu': 'PSU',
      'case': 'CASE'
    };
    return labels[category] || category;
  }

  handleImageError(event: any, product: Product) {
    console.log('Image failed to load:', product.image);
    // Fallback to a placeholder image
    event.target.src = 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}