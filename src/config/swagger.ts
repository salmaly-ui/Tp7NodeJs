// Définition manuelle du type OpenAPI (simplifié)
export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Dar Zitoun Twin - Restaurant Marocain',
    version: '1.0.0',
    description: 'API RESTful pour gérer les plats, commandes, chefs et clients authentifiés.',
    contact: { name: 'Votre Nom', email: 'vous@exemple.ma' }
  },
  servers: [{ url: 'http://localhost:5000/api/v1', description: 'Serveur local' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Plat: {
        type: 'object',
        properties: {
          nom: { type: 'string', example: 'Tajine Kefta' },
          prix: { type: 'number', example: 85 },
          categorie: { type: 'string', enum: ['tajine','couscous','grillade','pastilla','salade marocaine','patisserie'] },
          ingredients: { type: 'array', items: { type: 'string' }, example: ['kefta','oeuf'] },
          disponible: { type: 'boolean', default: true }
        }
      },
      Commande: {
        type: 'object',
        properties: {
          plats: { type: 'array', items: { $ref: '#/components/schemas/PlatCommande' } },
          delaiJours: { type: 'integer', example: 2 }
        }
      },
      PlatCommande: {
        type: 'object',
        properties: {
          platId: { type: 'string', example: '60f7b3b3e6b3b3b3b3b3b3b3' },
          quantite: { type: 'integer', example: 1 }
        }
      }
    }
  },
  paths: {
    '/clients/register': {
      post: {
        summary: "Inscription d'un nouveau client",
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email','password','nom','telephone'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 6 },
                  nom: { type: 'string' },
                  telephone: { type: 'string', pattern: '^(\\+212|0)[6-7]\\d{8}$' },
                  adresse: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Client créé' }, 400: { description: 'Erreur validation' } }
      }
    },
    '/clients/login': {
      post: {
        summary: 'Connexion – retourne un token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Token JWT' } }
      }
    },
    '/plats': {
      get: {
        summary: 'Liste des plats (public, avec filtres)',
        parameters: [
          { name: 'categorie', in: 'query', schema: { type: 'string' } },
          { name: 'minPrix', in: 'query', schema: { type: 'number' } },
          { name: 'maxPrix', in: 'query', schema: { type: 'number' } },
          { name: 'disponible', in: 'query', schema: { type: 'boolean' } }
        ],
        responses: { 200: { description: 'OK' } }
      },
      post: {
        summary: 'Créer un plat (admin uniquement)',
        security: [{ bearerAuth: [] }],
        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Plat' } } } },
        responses: { 201: { description: 'Plat créé' } }
      }
    },
    '/commandes': {
      post: {
        summary: 'Passer une commande (client authentifié)',
        security: [{ bearerAuth: [] }],
        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Commande' } } } },
        responses: { 201: { description: 'Commande enregistrée' } }
      },
      get: {
        summary: 'Voir ses commandes (client authentifié)',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Liste des commandes' } }
      }
    },
    '/commandes/{id}/livrer': {
      patch: {
        summary: 'Marquer une commande comme livrée (rôle livreur/admin)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Livrée avec frais de retard calculés' } }
      }
    }
  }
};