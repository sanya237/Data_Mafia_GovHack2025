import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Star, Plus, Users, TrendingUp, Building, GraduationCap, ShoppingBag } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useToast } from '../hooks/use-toast';
import { demoUseCases } from '../data/useCases';

export const CommunitySection = () => {
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [reviewForm, setReviewForm] = useState({
    title: '',
    body: '',
    stars: 5,
    author: ''
  });

  const { state, addReview, getAverageRating } = useAppStore();
  const { toast } = useToast();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDataset || !reviewForm.title || !reviewForm.body || !reviewForm.author) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    addReview({
      datasetId: selectedDataset,
      title: reviewForm.title,
      body: reviewForm.body,
      stars: reviewForm.stars as 1 | 2 | 3 | 4 | 5,
      author: reviewForm.author
    });

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback",
    });

    setReviewDialog(false);
    setReviewForm({ title: '', body: '', stars: 5, author: '' });
    setSelectedDataset('');
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'retail':
        return <ShoppingBag className="h-4 w-4" />;
      case 'property':
      case 'development':
        return <Building className="h-4 w-4" />;
      case 'education':
        return <GraduationCap className="h-4 w-4" />;
      case 'food & beverage':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const recentReviews = state.reviews
    .sort((a, b) => b.date - a.date)
    .slice(0, 6);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 flex items-center justify-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Community Insights
          </h2>
          <p className="text-muted-foreground">
            Real success stories and reviews from Data Genie users
          </p>
        </motion.div>

        {/* Use Cases */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {getIndustryIcon(useCase.industry)}
                      <Badge variant="outline">{useCase.industry}</Badge>
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {useCase.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                          Datasets Used
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {useCase.datasetsUsed.map((dataset) => (
                            <Badge key={dataset} variant="outline" className="text-xs">
                              {dataset}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <h5 className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                          Outcome
                        </h5>
                        <p className="text-sm font-medium">{useCase.outcome}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Reviews</h3>
            
            <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Dataset Review</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <Label htmlFor="dataset">Dataset</Label>
                    <select
                      id="dataset"
                      value={selectedDataset}
                      onChange={(e) => setSelectedDataset(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                      required
                    >
                      <option value="">Select a dataset...</option>
                      <option value="seifa-2021">SEIFA 2021</option>
                      <option value="census-2021">Census 2021</option>
                      <option value="cabee-2024">CABEE 2024</option>
                      <option value="building-approvals-2024">Building Approvals</option>
                      <option value="rppi-2024">RPPI</option>
                      <option value="jtw-2021">Journey to Work</option>
                      <option value="gtfs-vic">GTFS Victoria</option>
                      <option value="myschool-2024">My School</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="stars">Rating</Label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, stars: star }))}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= reviewForm.stars
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Review Title</Label>
                    <Input
                      id="title"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief summary of your experience"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="body">Review</Label>
                    <Textarea
                      id="body"
                      value={reviewForm.body}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, body: e.target.value }))}
                      placeholder="Share your experience with this dataset..."
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author">Your Name</Label>
                    <Input
                      id="author"
                      value={reviewForm.author}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="How should we credit you?"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Submit Review
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentReviews.map((review, index) => (
              <motion.div
                key={`${review.datasetId}-${review.date}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{review.datasetId}</Badge>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.stars
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-base">{review.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      "{review.body}"
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>— {review.author}</span>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};