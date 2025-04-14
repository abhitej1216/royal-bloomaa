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
    { id: 1, name: 'Perfumes', checked: false },
    { id: 2, name: 'Attars', checked: false },
    { id: 3, name: 'Body Mists', checked: false },
    { id: 4, name: 'Gift Sets', checked: false }
  ];

  occasions: Occasion[] = [
    { id: 1, name: 'Casual', checked: false },
    { id: 2, name: 'Business', checked: false },
    { id: 3, name: 'Evening', checked: false },
    { id: 4, name: 'Special Occasion', checked: false }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Marine Fresh',
      category: 'Perfumes',
      occasion: 'Casual',
      price: 89.99,
      originalPrice: 99.99,
      image: 'assets/images/products/marine-fresh.png',
      rating: 5,
      description: 'A fresh and invigorating marine scent'
    },
    {
      id: 2,
      name: 'Pine Elixir',
      category: 'Perfumes',
      occasion: 'Casual',
      price: 129.99,
      image: 'assets/images/products/pine-elixir.png',
      rating: 4,
      description: 'A woody and refreshing pine fragrance'
    },
    {
      id: 3,
      name: 'Office Hour',
      category: 'Perfumes',
      occasion: 'Business',
      price: 149.99,
      image: 'assets/images/products/office-hour.png',
      rating: 5,
      description: 'A sophisticated and professional scent'
    },
    {
      id: 4,
      name: 'Violet Essence',
      category: 'Perfumes',
      occasion: 'Evening',
      price: 119.99,
      originalPrice: 139.99,
      image: 'assets/images/products/violet-essence.png',
      rating: 4,
      description: 'A romantic floral fragrance'
    }
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