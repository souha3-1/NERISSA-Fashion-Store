import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Heart, Menu, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import { categoryLabels, formatPrice, products, type Category, type Product } from './data/products';
import { StoreProvider, useStore } from './store';

function Header() {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { cartCount, wishlist } = useStore();
  const links = [
    ['/shop', 'Shop'],
    ['/new-arrivals', 'New arrivals'],
    ['/category/dresses', 'Dresses'],
    ['/about', 'The label'],
  ];
  const goSearch = (event: FormEvent) => {
    event.preventDefault();
    setLocation(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
    setQuery('');
    setMobileOpen(false);
  };
  return (
    <header className="site-header">
      <div className="announcement">Complimentary delivery across Algeria on orders over 25,000 DA</div>
      <div className="container navbar">
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([href, label]) => <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replace(/\s/g, '-')}`}>{label}</Link>)}
        </nav>
        <Link href="/" className="brand" data-testid="link-brand">NERISSA</Link>
        <div className="nav-actions">
          <form onSubmit={goSearch} className="nav-search">
            <button className="icon-btn" type="submit" aria-label="Search" data-testid="button-open-search"><Search size={17} strokeWidth={1.5} /></button>
          </form>
          <Link href="/wishlist" className="icon-btn" aria-label="Wishlist" data-testid="link-wishlist">
            <Heart size={17} strokeWidth={1.5} fill={wishlist.length ? 'currentColor' : 'none'} />
            {wishlist.length > 0 && <span className="count" data-testid="count-wishlist">{wishlist.length}</span>}
          </Link>
          <Link href="/cart" className="icon-btn" aria-label="Shopping bag" data-testid="link-cart">
            <ShoppingBag size={17} strokeWidth={1.5} />
            {cartCount > 0 && <span className="count" data-testid="count-cart">{cartCount}</span>}
          </Link>
          <button className="icon-btn menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" data-testid="button-mobile-menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="mobile-nav container" aria-label="Mobile navigation">
          {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} data-testid={`mobile-link-${label.toLowerCase().replace(/\s/g, '-')}`}>{label}</Link>)}
          <form onSubmit={goSearch} className="newsletter-form">
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the collection" aria-label="Search the collection" data-testid="input-mobile-search" />
            <button type="submit" data-testid="button-mobile-search">Search</button>
          </form>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">NERISSA</div>
          <p>Modern wardrobe pieces, considered in Algiers and made for the many ways a woman moves through her day.</p>
        </div>
        <div>
          <div className="footer-title">Explore</div>
          <div className="footer-links"><Link href="/shop">Shop all</Link><Link href="/new-arrivals">New arrivals</Link><Link href="/about">Our story</Link></div>
        </div>
        <div>
          <div className="footer-title">Help</div>
          <div className="footer-links"><Link href="/contact">Contact</Link><Link href="/cart">Delivery & returns</Link><Link href="/wishlist">Wishlist</Link></div>
        </div>
        <div>
          <div className="footer-title">Visit NERISSA</div>
          <p>Bab El Oued, Algiers<br />By appointment, Tuesday–Saturday</p>
          <p>hello@nerissa.dz</p>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2024 NERISSA. Made in Algeria.</span><span>DA · DZD / EN</span></div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist } = useStore();
  const wished = isWishlisted(product.id);
  return (
    <article className="product-card" data-testid={`card-product-${product.id}`}>
      <div className="product-visual">
        <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`}><img src={product.image} alt={product.name} /></Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="icon-btn product-heart" onClick={() => toggleWishlist(product.id)} aria-label={`${wished ? 'Remove' : 'Save'} ${product.name}`} data-testid={`button-wishlist-${product.id}`}>
          <Heart size={18} strokeWidth={1.5} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>
      <Link href={`/product/${product.id}`} className="product-info" data-testid={`link-product-info-${product.id}`}>
        <div className="product-name">{product.name}</div>
        <div className="product-meta"><span>{categoryLabels[product.category]}</span><span className="product-price">{formatPrice(product.price)}</span></div>
      </Link>
    </article>
  );
}

function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) return <div className="empty-state"><h2>No pieces found.</h2><p>Try another search or take a look at the full collection.</p><Link className="btn btn-dark" href="/shop">View the collection</Link></div>;
  return <div className="products-grid">{items.map(product => <ProductCard product={product} key={product.id} />)}</div>;
}

function Home() {
  const arrivals = products.filter(product => product.isNew).slice(0, 4);
  const bestsellers = products.filter(product => product.isBestSeller).slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="hero-copy fade-up">
          <span className="eyebrow">The autumn edit · 04</span>
          <h1>Dress for<br /><em>your own</em><br />weather.</h1>
          <p>Pieces with presence, made to be worn often. NERISSA is a modern Algerian label for the life you actually lead.</p>
          <Link href="/new-arrivals" className="btn btn-dark" data-testid="link-hero-shop">Discover the edit <ArrowRight size={15} /></Link>
        </div>
        <div className="hero-image" role="img" aria-label="Woman wearing the NERISSA burgundy silk dress" />
      </section>
      <div className="ticker"><span>Made in Algeria</span><span>Thoughtful materials</span><span>Small-batch pieces</span><span>Designed for repeat wear</span></div>
      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">Find your shape</span><h2>Start with a feeling.</h2></div><p>From first coffee to last light, discover silhouettes that leave room for your life.</p></div>
        <div className="category-grid">
          <Link href="/category/dresses" className="category-card" data-testid="link-category-dresses"><img src="/images/hero-burgundy.jpg" alt="Dresses collection" /><div className="category-label"><span>01 / The essential</span>Dresses</div></Link>
          <Link href="/category/tops" className="category-card" data-testid="link-category-tops"><img src="/images/rose-blazer.jpg" alt="Tops collection" /><div className="category-label"><span>02 / The layer</span>Tops</div></Link>
          <Link href="/category/co-ord-sets" className="category-card" data-testid="link-category-coords"><img src="/images/editorial-ivory.jpg" alt="Co-ord sets collection" /><div className="category-label"><span>03 / The pair</span>Co-ords</div></Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">Just in</span><h2>New, not noisy.</h2></div><Link className="btn btn-quiet" href="/new-arrivals" data-testid="link-home-new-arrivals">See all arrivals <ArrowRight size={15} /></Link></div>
        <ProductGrid items={arrivals} />
      </section>
      <section className="campaign">
        <div className="campaign-image" role="img" aria-label="Ivory linen NERISSA co-ord in a sunlit studio" />
        <div className="campaign-copy"><span className="eyebrow">A quiet confidence</span><h2>For the days that become nights.</h2><p>Our fourth collection is a study in contrasts: soft against structured, ease against intention, a wardrobe that keeps its promises.</p><Link href="/about" className="btn" data-testid="link-campaign-story">Read the story <ArrowRight size={15} /></Link></div>
      </section>
      <section className="quote"><span className="eyebrow">The NERISSA point of view</span><p>“The best piece in your wardrobe is the one that already knows how you move.”</p><small>— Samia Aït Ali, founder</small></section>
      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">The pieces women return to</span><h2>Quiet favourites.</h2></div><Link className="btn btn-quiet" href="/shop" data-testid="link-home-bestsellers">Shop bestsellers <ArrowRight size={15} /></Link></div>
        <ProductGrid items={bestsellers} />
      </section>
      <section className="section container story-preview">
        <div className="story-art" role="img" aria-label="Terracotta pleated NERISSA look" />
        <div className="story-copy"><span className="eyebrow">From Algiers, with care</span><h2>A label with a local pulse.</h2><p>NERISSA began with a simple question: what would an elegant, expressive wardrobe look like if it was designed around real Algerian life? The answer is here—in generous cuts, tactile fabrics, and colours that belong to our light.</p><Link href="/about" className="btn btn-dark" data-testid="link-home-about">Meet NERISSA <ArrowRight size={15} /></Link></div>
      </section>
      <Newsletter />
    </>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); if (email.includes('@')) setSubmitted(true); };
  return <section className="newsletter"><div><span className="eyebrow">A note from NERISSA</span><h2>Keep in touch.</h2><p>New pieces, studio notes, and a little inspiration. No noise, just the good things.</p></div><form className="newsletter-form" onSubmit={submit}><input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" data-testid="input-newsletter-email" /><button type="submit" data-testid="button-newsletter-submit">{submitted ? 'Thank you' : 'Subscribe'}</button></form></section>;
}

function CatalogPage({ items, title, description }: { items: Product[]; title: string; description: string }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [category, setCategory] = useState('all');
  const filtered = useMemo(() => {
    const result = items.filter(product => (category === 'all' || product.category === category) && `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()));
    return [...result].sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0);
  }, [items, search, sort, category]);
  return <section className="container page-top"><div className="eyebrow">The collection</div><h1>{title}</h1><p>{description}</p>
    <div className="catalog-toolbar"><span className="eyebrow">{filtered.length} pieces</span><div className="toolbar-actions"><input className="field search-field" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search pieces" aria-label="Search pieces" data-testid="input-catalog-search" /><select className="select" value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort products" data-testid="select-sort"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div>
    <div className="filter-drawer"><button className={`filter-chip ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')} data-testid="button-filter-all">All pieces</button>{Object.entries(categoryLabels).map(([value, label]) => <button key={value} className={`filter-chip ${category === value ? 'active' : ''}`} onClick={() => setCategory(value)} data-testid={`button-filter-${value}`}>{label}</button>)}</div>
    <ProductGrid items={filtered} /></section>;
}

function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>();
  const validCategory = category as Category;
  return <CatalogPage items={products.filter(product => product.category === validCategory)} title={categoryLabels[validCategory] || 'Collection'} description="A considered edit of pieces that make getting dressed feel like a good idea." />;
}

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(item => item.id === id);
  if (!product) return <NotFound />;
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [added, setAdded] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const wished = isWishlisted(product.id);
  return <section className="container product-detail">
    <div className="gallery"><div className="gallery-thumbs">{product.gallery.map(image => <button key={image} className={`thumb ${activeImage === image ? 'active' : ''}`} onClick={() => setActiveImage(image)} data-testid={`button-gallery-${image}`}><img src={image} alt="" /></button>)}</div><div className="gallery-main"><img src={activeImage} alt={product.name} data-testid="img-product-main" /></div></div>
    <div className="detail-copy"><span className="eyebrow">{categoryLabels[product.category]} / NERISSA</span><h1>{product.name}</h1><div className="detail-price">{formatPrice(product.price)}</div><p className="detail-description">{product.description}</p>
      <span className="choice-label">Colour · {selectedColor}</span><div className="color-options">{product.colors.map(color => <button key={color.name} className={`color-option ${selectedColor === color.name ? 'active' : ''}`} style={{ background: color.value }} onClick={() => setSelectedColor(color.name)} aria-label={color.name} data-testid={`button-color-${color.name}`} />)}</div>
      <span className="choice-label">Size · {selectedSize} <button className="remove-button" type="button" onClick={() => setShowGuide(!showGuide)} data-testid="button-size-guide">Size guide</button></span><div className="size-options">{product.sizes.map(size => <button key={size} className={`size-option ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)} data-testid={`button-size-${size}`}>{size}</button>)}</div>{showGuide && <div className="success-message" style={{ marginTop: 16 }} data-testid="status-size-guide">Our fit follows standard EU sizing. Between sizes? Choose the larger size for a more relaxed line.</div>}
      <div className="purchase-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" data-testid="button-quantity-decrease"><Minus size={14} /></button><span data-testid="text-quantity">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity" data-testid="button-quantity-increase"><Plus size={14} /></button></div><button className="btn btn-dark add-button" onClick={() => { addToCart(product, selectedSize, selectedColor, quantity); setAdded(true); }} data-testid="button-add-to-cart">{added ? 'Added to bag' : 'Add to bag'} <ShoppingBag size={15} /></button><button className="icon-btn" onClick={() => toggleWishlist(product.id)} aria-label="Save to wishlist" data-testid="button-product-wishlist"><Heart size={20} fill={wished ? 'currentColor' : 'none'} /></button></div>
      <div className="detail-notes"><div className="detail-note"><strong>Delivery</strong>2–5 working days across Algeria.</div><div className="detail-note"><strong>Fabric</strong>Selected for touch, movement and repeat wear.</div><div className="detail-note"><strong>Returns</strong>Easy returns within 14 days.</div></div>
    </div>
  </section>;
}

function AboutPage() {
  return <div className="split-page"><div className="split-art" role="img" aria-label="NERISSA rose blazer campaign" /><div className="split-content"><span className="eyebrow">The NERISSA story</span><h1>Clothes with a point of view, not a shelf life.</h1><p>NERISSA is an independent womenswear label born in Algiers. We make modern, elegant pieces for women who want their clothes to keep up with the fullness of their lives.</p><p>Our references are close to home: the pale gold of late afternoon on a balcony, the rose-brown walls of the Casbah, the way a grandmother folds a beautiful fabric before putting it away. We translate those feelings into clothes with clear lines, generous movement, and just enough surprise.</p><div className="values"><div className="value"><strong>01 / Considered</strong><p>Small runs, thoughtful materials, and details you notice with time.</p></div><div className="value"><strong>02 / Local</strong><p>Designed in Algiers and made with people we know and trust.</p></div><div className="value"><strong>03 / Lasting</strong><p>A wardrobe built for repeat wear, not one perfect photograph.</p></div></div><Link className="btn btn-dark" href="/shop" style={{ marginTop: 45 }} data-testid="link-about-shop">Explore the collection <ArrowRight size={15} /></Link></div></div>;
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); if (!form.name.trim() || !form.email.includes('@') || form.message.trim().length < 10) { setError('Please add your name, a valid email, and a little more detail.'); return; } setError(''); setSent(true); };
  return <section className="container form-page"><span className="eyebrow">Come say hello</span><h1>Let’s talk.</h1><p>Questions about a piece, an order, or a collaboration? Our small team in Algiers would love to hear from you.</p><form className="contact-form" onSubmit={submit}><div className="form-group"><label htmlFor="name">Name</label><input id="name" className="field" value={form.name} onChange={event => update('name', event.target.value)} data-testid="input-contact-name" /></div><div className="form-group"><label htmlFor="email">Email</label><input id="email" className="field" type="email" value={form.email} onChange={event => update('email', event.target.value)} data-testid="input-contact-email" /></div><div className="form-group full"><label htmlFor="message">Message</label><textarea id="message" className="field textarea" value={form.message} onChange={event => update('message', event.target.value)} data-testid="textarea-contact-message" /></div><button className="btn btn-dark" type="submit" data-testid="button-contact-submit">Send message <ArrowRight size={15} /></button></form>{error && <div className="form-error" role="alert" data-testid="status-contact-error">{error}</div>}{sent && <div className="success-message" data-testid="status-contact-success">Thank you, {form.name}. Your note is with the NERISSA team.</div>}</section>;
}

function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useStore();
  const delivery = cartTotal >= 25000 || cartTotal === 0 ? 0 : 600;
  return <section className="container cart-page"><span className="eyebrow">Your selection</span><h1 className="page-top" style={{ padding: '12px 0 0' }}>Shopping bag</h1>{!cart.length ? <div className="empty-state"><h2>Your bag is waiting.</h2><p>There’s always room for one more good piece.</p><Link className="btn btn-dark" href="/shop" data-testid="link-empty-cart-shop">Continue shopping</Link></div> : <div className="cart-layout"><div className="cart-list">{cart.map(item => <div className="cart-item" key={`${item.product.id}-${item.size}-${item.color}`}><img src={item.product.image} alt={item.product.name} /><div><h3>{item.product.name}</h3><p>{item.color} · Size {item.size}</p><div className="cart-item-actions"><div className="quantity"><button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} aria-label="Decrease item quantity" data-testid={`button-cart-decrease-${item.product.id}`}><Minus size={13} /></button><span data-testid={`text-cart-quantity-${item.product.id}`}>{item.quantity}</span><button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} aria-label="Increase item quantity" data-testid={`button-cart-increase-${item.product.id}`}><Plus size={13} /></button></div><button className="remove-button" onClick={() => removeFromCart(item.product.id, item.size)} data-testid={`button-remove-${item.product.id}`}>Remove</button></div></div><strong>{formatPrice(item.product.price * item.quantity)}</strong></div>)}</div><div className="summary"><h2>Summary</h2><div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div><div className="summary-row"><span>Delivery</span><span>{delivery ? formatPrice(delivery) : 'Complimentary'}</span></div><div className="summary-row summary-total"><span>Total</span><span>{formatPrice(cartTotal + delivery)}</span></div><button className="btn btn-dark" onClick={() => alert('Demo checkout — no payment is processed.')} data-testid="button-demo-checkout">Proceed to checkout</button></div></div>}</section>;
}

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter(product => wishlist.includes(product.id));
  return <section className="container page-top"><span className="eyebrow">Your saved pieces</span><h1>Wishlist</h1><p>Keep the pieces that made you pause close by.</p>{items.length ? <ProductGrid items={items} /> : <div className="empty-state"><h2>Nothing saved yet.</h2><p>When a piece feels like you, tap the heart to keep it here.</p><Link href="/shop" className="btn btn-dark" data-testid="link-empty-wishlist-shop">Browse the collection</Link></div>}</section>;
}

function SearchPage() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';
  const items = products.filter(product => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.toLowerCase()));
  return <CatalogPage items={items} title={query ? `Results for “${query}”` : 'Search'} description="Find a piece by name, shape, or feeling." />;
}

function NotFound() {
  return <section className="container empty-state" style={{ margin: '100px auto' }}><span className="eyebrow">404</span><h2>This page took a different turn.</h2><p>Let’s get you back to the good stuff.</p><Link className="btn btn-dark" href="/" data-testid="link-not-found-home">Return home</Link></section>;
}

function RoutedPages() {
  return <Switch><Route path="/" component={Home} /><Route path="/shop"><CatalogPage items={products} title="The collection" description="A wardrobe of modern essentials, made with feeling and finished for a life in motion." /></Route><Route path="/new-arrivals"><CatalogPage items={products.filter(product => product.isNew)} title="New arrivals" description="The latest pieces from NERISSA, introduced in small runs and made to be worn right away." /></Route><Route path="/category/:category" component={CategoryPage} /><Route path="/product/:id" component={ProductPage} /><Route path="/about" component={AboutPage} /><Route path="/contact" component={ContactPage} /><Route path="/cart" component={CartPage} /><Route path="/wishlist" component={WishlistPage} /><Route path="/search" component={SearchPage} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <StoreProvider><Layout><RoutedPages /></Layout></StoreProvider>;
}