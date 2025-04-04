import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

interface Category {
  id: number;
  name: string;
  checked: boolean;
}

interface Occasion {
  id: number;
  name: string;
  checked: boolean;
}

interface Product {
  id: number;
  name: string;
  category: string;
  occasion: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  description: string;
}

interface PriceRange {
  min: number | null;
  max: number | null;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  categories: Category[] = [
    { id: 1, name: 'Bouquets', checked: false },
    { id: 2, name: 'Arrangements', checked: false },
    { id: 3, name: 'Single Flowers', checked: false },
    { id: 4, name: 'Plants', checked: false },
    { id: 5, name: 'Accessories', checked: false }
  ];

  occasions: Occasion[] = [
    { id: 1, name: 'Birthday', checked: false },
    { id: 2, name: 'Wedding', checked: false },
    { id: 3, name: 'Anniversary', checked: false },
    { id: 4, name: 'Sympathy', checked: false },
    { id: 5, name: 'Thank You', checked: false }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Elegant Rose Bouquet',
      category: 'Bouquets',
      occasion: 'Anniversary',
      price: 89.99,
      originalPrice: 99.99,
      image: 'assets/images/products/bouquet-1.jpg',
      rating: 5,
      description: 'A beautiful bouquet of roses'
    },
    {
      id: 2,
      name: 'Spring Garden Arrangement',
      category: 'Arrangements',
      occasion: 'Birthday',
      price: 129.99,
      image: 'assets/images/products/arrangement-1.jpg',
      rating: 4,
      description: 'A lovely arrangement for a birthday'
    },
    // Add more products here
  ];

  filteredProducts: Product[] = [];
  priceRange: PriceRange = {
    min: null,
    max: null
  };

  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;

  sortBy: string = 'name';
  selectedCategory: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.applyFilters();
  }

  onCategoryChange(categoryId: number) {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      category.checked = !category.checked;
      this.applyFilters();
    }
  }

  onOccasionChange(occasionId: number) {
    const occasion = this.occasions.find(o => o.id === occasionId);
    if (occasion) {
      occasion.checked = !occasion.checked;
      this.applyFilters();
    }
  }

  onPriceRangeChange() {
    this.applyFilters();
  }

  resetFilters() {
    this.categories.forEach(c => c.checked = false);
    this.occasions.forEach(o => o.checked = false);
    this.priceRange = {
      min: null,
      max: null
    };
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    // Apply category filter
    const selectedCategories = this.categories.filter(c => c.checked).map(c => c.name);
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Apply occasion filter
    const selectedOccasions = this.occasions.filter(o => o.checked).map(o => o.name);
    if (selectedOccasions.length > 0) {
      filtered = filtered.filter(p => selectedOccasions.includes(p.occasion));
    }

    // Apply price range filter
    if (this.priceRange.min !== null) {
      filtered = filtered.filter(p => p.price >= this.priceRange.min!);
    }
    if (this.priceRange.max !== null) {
      filtered = filtered.filter(p => p.price <= this.priceRange.max!);
    }

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updateDisplayedProducts(filtered);
  }

  updateDisplayedProducts(filtered: Product[]) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredProducts = filtered.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  }

  sortProducts(criteria: string) {
    this.sortBy = criteria;
    this.filteredProducts.sort((a, b) => {
      if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.price - b.price;
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredProducts = this.products.filter(product => 
      category === '' || product.category === category
    );
  }
} 