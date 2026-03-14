import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, X, Save, ArrowLeft, LogOut, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface Project {
    id: number;
    name: string;
    description: string;
    material: string;
    dimensions: string;
    details: string[];
    image: string;
    color: string;
}

const STORAGE_BUCKET = 'product-images';

export function AdminPanel() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            const session = data.session;
            setIsLoggedIn(!!session);
            if (session) fetchProjects();
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setIsLoggedIn(!!session);
            if (session) fetchProjects();
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = username.trim();
        const pass = password.trim();
        const email = user.includes('@') ? user : `${user}@lisboaleather.com`;
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
            if (error) {
                if (error.message === 'Invalid login credentials') {
                    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password: pass });
                    if (!signUpError && signUpData.session) {
                        toast.success('Conta criada e login realizado!');
                        return;
                    }
                    if (!signUpError && signUpData.user && !signUpData.session) {
                        toast.info('Verifique seu email para confirmar. Ou em Supabase: Authentication > Providers > desative "Confirm email".');
                        return;
                    }
                }
                toast.error('Usuário ou senha incorretos. Crie o admin em Supabase: Authentication > Users > Add user (email: admin@lisboaleather.com / senha: admin123)');
                return;
            }
            toast.success('Login realizado com sucesso');
        } catch (err) {
            toast.error('Erro ao fazer login');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.info('Sessão encerrada');
    };

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('id, name, description, material, dimensions, details, image, color, nome, descricao, imagem')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Erro ao carregar produtos');
            return;
        }
        const parsed = (data || []).map((p: any) => ({
            ...p,
            name: p.name ?? p.nome ?? '',
            description: p.description ?? p.descricao ?? '',
            image: p.image ?? p.imagem ?? '',
            details: Array.isArray(p.details) ? p.details : []
        }));
        setProjects(parsed);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const ext = file.name.split('.').pop() || 'jpg';
            const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const { data, error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });

            if (error) {
                toast.error('Erro ao enviar imagem. Crie o bucket "' + STORAGE_BUCKET + '" no Supabase Storage.');
                return;
            }
            const { data: { publicUrl } } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
            setCurrentProject(prev => ({ ...prev, image: publicUrl }));
            toast.success('Imagem enviada com sucesso');
        } catch {
            toast.error('Erro ao enviar imagem');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!currentProject.name || !currentProject.image) {
            toast.error('Nome e imagem são obrigatórios');
            return;
        }

        const payload = {
            name: currentProject.name,
            description: currentProject.description ?? '',
            material: currentProject.material ?? '',
            dimensions: currentProject.dimensions ?? '',
            details: currentProject.details ?? [],
            image: currentProject.image,
            color: currentProject.color ?? '',
        };

        try {
            if (currentProject.id) {
                const { error } = await supabase.from('products').update(payload).eq('id', currentProject.id);
                if (error) throw error;
                toast.success('Produto atualizado');
            } else {
                const { error } = await supabase.from('products').insert(payload);
                if (error) throw error;
                toast.success('Produto criado');
            }
            setIsEditing(false);
            setCurrentProject({});
            fetchProjects();
        } catch (err: any) {
            toast.error(err?.message || 'Erro ao salvar produto');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            toast.success('Produto excluído');
            fetchProjects();
        } catch (err: any) {
            toast.error(err?.message || 'Erro ao excluir produto');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#FDF8F8] flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-rose-100 max-w-md w-full border border-rose-50">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif text-gray-900 mb-2">Lisboa Leather</h1>
                        <p className="text-gray-500">Acesso Restrito ao Painel</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Usuário"
                                autoComplete="username"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Senha"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 rounded-xl font-medium shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all active:scale-[0.98]"
                        >
                            Entrar no Painel
                        </button>
                        <Link to="/" className="block text-center text-sm text-gray-400 hover:text-rose-400 transition-colors">
                            Voltar ao site
                        </Link>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-2xl font-serif text-gray-900">Painel Administrativo</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setCurrentProject({ details: [] });
                            setIsEditing(true);
                        }}
                        className="bg-rose-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-rose-600 transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Novo Produto
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Sair"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>
            </header>

            <main className="flex-1 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Sem+Foto';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            setCurrentProject(project);
                                            setIsEditing(true);
                                        }}
                                        className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 truncate">{project.name}</h3>
                                <p className="text-sm text-gray-500 truncate">{project.material}</p>
                                <div className="mt-2 text-xs font-medium text-rose-500 uppercase tracking-wider">
                                    {project.color}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-xl font-serif text-gray-900">
                                {currentProject.id ? 'Editar Produto' : 'Novo Produto'}
                            </h2>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentProject({});
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                                    <input
                                        type="text"
                                        value={currentProject.name || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                        placeholder="Ex: Bolsa Elegance"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                                    <input
                                        type="text"
                                        value={currentProject.color || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, color: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                        placeholder="Ex: Off-White"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta</label>
                                <textarea
                                    value={currentProject.description || ''}
                                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                    rows={2}
                                    placeholder="Descrição que aparece no catálogo..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                                    <input
                                        type="text"
                                        value={currentProject.material || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, material: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                        placeholder="Ex: Couro Legítimo"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensões</label>
                                    <input
                                        type="text"
                                        value={currentProject.dimensions || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, dimensions: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                        placeholder="Ex: 30cm x 20cm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Produto</label>
                                <div className="mt-1 flex flex-wrap items-center gap-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-dashed border-gray-300">
                                        {currentProject.image ? (
                                            <img src={currentProject.image} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="h-8 w-8 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="bg-white border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium">
                                            {uploading ? 'Enviando...' : 'Enviar Foto (Supabase Storage)'}
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                        <span className="text-xs text-gray-500">Ou cole a URL da imagem abaixo</span>
                                        <input
                                            type="url"
                                            placeholder="https://..."
                                            value={currentProject.image || ''}
                                            onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Detalhes (um por linha)</label>
                                <textarea
                                    value={currentProject.details?.join('\n') || ''}
                                    onChange={(e) => setCurrentProject({ ...currentProject, details: e.target.value.split('\n').filter(l => l.trim()) })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                    rows={4}
                                    placeholder="Alça removível&#10;Forro de cetim"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-4 sticky bottom-0 bg-white">
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentProject({});
                                }}
                                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-rose-500 text-white rounded-lg flex items-center gap-2 hover:bg-rose-600 transition-all font-medium"
                            >
                                <Save className="h-5 w-5" />
                                Salvar Produto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
