import numpy as np
import matplotlib.pyplot as plt
from cs231n.vis_utils import visualize_grid
import pickle
import os.path

## Data to pickle

def savedb(obj,filename):
    with open(filename,'wb') as file:
        pickle.dump(obj,file)
    
def loaddb(filename):
    with open(filename,'rb') as file:
        obj = pickle.load(file)
        return obj
    
# his, epo_it, epo_W1
    
def pickle_exist(CNN_mid_width, CNN_d, drop, reg, lr, CNN_out_width, h_fc, epoch):
    filename = f'pickle/{CNN_mid_width}-{CNN_d}-{drop}-{reg}-{lr}-{CNN_out_width}-{h_fc}-{epoch}.pickle'
    if os.path.isfile(filename):
        return True
    return False

def save_pickle(CNN_mid_width, CNN_d, drop, reg, lr, CNN_out_width, h_fc, epoch, val_acc, his, epo_it, epo_W1, dtype = np.half):
#     W1 = dtype(W1)
    for W1_i in epo_W1.keys():
        epo_W1[W1_i] = dtypr(epo_W1[W1_i])
    for key in his.keys():
        his[key] = dtype(his[key])
    obj = (CNN_mid_width, CNN_d, drop, reg, lr, CNN_out_width, h_fc, epoch, val_acc, his, epo_it, epo_W1)
    filename = f'pickle/{CNN_mid_width}-{CNN_d}-{drop}-{reg}-{lr}-{CNN_out_width}-{h_fc}-{epoch}.pickle'
    savedb(obj,filename)
    
def get_pickle(CNN_mid_width, CNN_d, drop, reg, lr, CNN_out_width, h_fc, epoch):
    filename = f'pickle/{CNN_mid_width}-{CNN_d}-{drop}-{reg}-{lr}-{CNN_out_width}-{h_fc}-{epoch}.pickle'
    return loaddb(filename)
    
## Data to graph

dtype = np.half

def showAcc(loss_his, train_his, vali_his):
    plt.subplot(2, 1, 1)
    plt.plot(loss_his, 'o')
    plt.xlabel('iteration')
    plt.ylabel('loss')

    plt.subplot(2, 1, 2)
    plt.plot(train_his, '-o')
    plt.plot(vali_his, '-o')
    plt.legend(['train', 'val'], loc='upper left')
    plt.xlabel('epoch')
    plt.ylabel('accuracy')
    plt.show()
    
def show_net_weights(W1):
    grid = visualize_grid(W1)
    plt.imshow(grid.astype('uint8'))
    plt.axis('off')
    plt.gcf().set_size_inches(5, 5)
    plt.show()