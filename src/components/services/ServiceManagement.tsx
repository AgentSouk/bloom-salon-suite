
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, DollarSign } from "lucide-react";

export const ServiceManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const services = [
    {
      id: 1,
      name: "Women's Haircut",
      category: "Hair",
      duration: 45,
      price: 65,
      description: "Precision cut with styling",
      popularity: "High"
    },
    {
      id: 2,
      name: "Hair Color (Full)",
      category: "Hair",
      duration: 120,
      price: 120,
      description: "Complete color transformation",
      popularity: "High"
    },
    {
      id: 3,
      name: "Hair Color (Highlights)",
      category: "Hair",
      duration: 90,
      price: 95,
      description: "Partial highlights",
      popularity: "Medium"
    },
    {
      id: 4,
      name: "Men's Haircut",
      category: "Hair",
      duration: 30,
      price: 45,
      description: "Classic men's cut and style",
      popularity: "High"
    },
    {
      id: 5,
      name: "Beard Trim",
      category: "Hair",
      duration: 20,
      price: 25,
      description: "Professional beard grooming",
      popularity: "Medium"
    },
    {
      id: 6,
      name: "Classic Manicure",
      category: "Nails",
      duration: 45,
      price: 35,
      description: "Nail care and polish",
      popularity: "High"
    },
    {
      id: 7,
      name: "Gel Manicure",
      category: "Nails",
      duration: 60,
      price: 50,
      description: "Long-lasting gel polish",
      popularity: "High"
    },
    {
      id: 8,
      name: "Pedicure",
      category: "Nails",
      duration: 60,
      price: 45,
      description: "Foot care and polish",
      popularity: "Medium"
    }
  ];

  const categories = ["all", "Hair", "Nails"];
  
  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Management</h1>
          <p className="text-gray-600">Manage your service catalog and pricing</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>

      <div className="flex space-x-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {category === "all" ? "All Services" : category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <p className="text-sm text-gray-600">{service.category}</p>
                </div>
                <Badge className={getPopularityColor(service.popularity)}>
                  {service.popularity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{service.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{service.duration} min</span>
                </div>
                <div className="flex items-center text-gray-900 font-semibold">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{service.price}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
