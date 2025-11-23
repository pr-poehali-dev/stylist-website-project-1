import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const services = [
    {
      title: 'Персональный стилист',
      description: 'Индивидуальный подбор образов под ваш стиль жизни и особенности фигуры',
      icon: 'Sparkles',
      price: 'от 5000 ₽'
    },
    {
      title: 'Шоппинг-сопровождение',
      description: 'Помогу выбрать идеальные вещи в магазинах и создать капсульный гардероб',
      icon: 'ShoppingBag',
      price: 'от 7000 ₽'
    },
    {
      title: 'Разбор гардероба',
      description: 'Анализ существующих вещей и рекомендации по обновлению гардероба',
      icon: 'Shirt',
      price: 'от 4000 ₽'
    },
    {
      title: 'Имидж-консультация',
      description: 'Определение цветотипа, стиля и создание персонального имиджа',
      icon: 'Palette',
      price: 'от 6000 ₽'
    },
    {
      title: 'Lookbook',
      description: 'Создание готовых образов из вашего гардероба с фотофиксацией',
      icon: 'Camera',
      price: 'от 8000 ₽'
    },
    {
      title: 'Онлайн-консультация',
      description: 'Удаленная работа над вашим стилем в формате видеозвонка',
      icon: 'Video',
      price: 'от 3000 ₽'
    }
  ];

  const portfolio = [
    { id: 1, category: 'Деловой стиль' },
    { id: 2, category: 'Кэжуал' },
    { id: 3, category: 'Вечерний образ' },
    { id: 4, category: 'Street style' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
    setIsBookingOpen(false);
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">STYLE</h1>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
              <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Портфолио</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">Обо мне</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Записаться
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold gradient-text">Онлайн-запись</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Услуга *</Label>
                      <Select required value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.title} value={service.title}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Комментарий</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Расскажите о ваших пожеланиях..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Button variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Создаю образы,<br />
            <span className="gradient-text">которые вдохновляют</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Персональный стилист с 8-летним опытом. Помогу найти ваш идеальный стиль и создать гардероб мечты
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                  Записаться на консультацию
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="#portfolio">Посмотреть портфолио</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Услуги</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Индивидуальный подход к каждому клиенту. Работаю как онлайн, так и офлайн
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={service.title} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-2 hover:border-primary/50" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="hover:bg-primary hover:text-white">
                          Записаться
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Портфолио</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Примеры работ с реальными клиентами
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((item, index) => (
              <div key={item.id} className="relative group overflow-hidden rounded-2xl h-96 bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Image" size={64} className="text-muted-foreground/30" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{item.category}</h3>
                  <p className="text-sm opacity-90">Трансформация образа клиента</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 animate-fade-in">
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="User" size={120} className="text-muted-foreground/20" />
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Обо мне</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Привет! Меня зовут Анна, и я персональный стилист с 8-летним опытом работы в индустрии моды.
                </p>
                <p>
                  За время моей карьеры я помогла более 500 клиентам найти свой уникальный стиль и почувствовать себя увереннее. Моя философия проста: каждый человек уникален, и его стиль должен отражать индивидуальность.
                </p>
                <p>
                  Я окончила Академию индустрии моды и прошла стажировку в ведущих модных домах Европы. Постоянно слежу за трендами, но верю, что настоящий стиль вне времени.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Award" size={24} className="text-primary" />
                    <span className="font-semibold">500+ клиентов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={24} className="text-primary" />
                    <span className="font-semibold">8 лет опыта</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Контакты</h2>
          <p className="text-center text-muted-foreground mb-12">
            Свяжитесь со мной любым удобным способом
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Телефон</h3>
                <a href="tel:+79991234567" className="text-muted-foreground hover:text-primary transition-colors">
                  +7 (999) 123-45-67
                </a>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:style@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                  style@example.com
                </a>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Telegram</h3>
                <a href="https://t.me/stylename" className="text-muted-foreground hover:text-primary transition-colors">
                  @stylename
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4 justify-center">
            <Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:bg-primary hover:text-white hover:border-primary">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:bg-primary hover:text-white hover:border-primary">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:bg-primary hover:text-white hover:border-primary">
              <Icon name="Youtube" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 STYLE. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
